import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaFacebook, FaLaptop, FaUser, FaInstagram, FaYoutube, FaTelegram, FaDiscord, FaTwitch, FaRobot } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import logo from '../../../../assets/logo.png';
import gcash from '../../../../assets/gcash.png';
import paypal from '../../../../assets/paypal.png';
import visa from '../../../../assets/visa.png';
import maya from '../../../../assets/maya.png';
import homecredit from '../../../../assets/homecredit.png';
import mastercard from '../../../../assets/mastercard.png';
import usdt from '../../../../assets/usdt.png';
import ethereum from '../../../../assets/ethereum.png';
import xmr from '../../../../assets/xmr.png';
import btc from '../../../../assets/btc.png';
import Searchengine from '../../../../components/userspages/interactive/searchbar';
import { cartAPI, getUser, productAPI } from '../../../../services/api';
import { FaThreads } from 'react-icons/fa6';
import { remoteProductImage } from '../../../../services/productImages';
const ACER_KEYWORDS = ['acer', 'aspire', 'predator', 'swift', 'travelmate', 'iconia', 'chromebook'];
const LAPTOP_TYPES = [
    { key: 'ALL', label: 'All' },
    { key: 'WL', label: 'Working' },
    { key: 'GL', label: 'Gaming' },
    { key: 'UL', label: 'Ultrabook' },
    { key: 'CL', label: 'Chromebook' },
    { key: '2IN1', label: '2-in-1' },
];

const TYPE_LABELS = LAPTOP_TYPES.reduce((labels, type) => ({ ...labels, [type.key]: type.label }), {});

const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'low-to-high', label: 'Price: low to high' },
    { value: 'high-to-low', label: 'Price: high to low' },
];

const toNumberOrNull = (value) => {
    if (value === '' || value === null) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const isAcerLaptop = (product) => {
    const haystack = `${product.name || ''} ${product.brand || ''} ${product.subbrand || ''}`.toLowerCase();
    return haystack.includes('acer');
};

function Acer() {
    const navigate = useNavigate();
    const user = useMemo(() => getUser(), []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [activeType, setActiveType] = useState('ALL');
    const [priceSort, setPriceSort] = useState('featured');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [toast, setToast] = useState('');

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError('');
        /* The API only returns active, in-stock laptops for category=LAP. */
        productAPI.getAll('LAP')
            .then(({ data }) => {
                const items = Array.isArray(data) ? data : data?.results || [];
                if (!cancelled) setProducts(items.filter(isAcerLaptop));
            })
            .catch(() => {
                if (cancelled) return;
                setProducts([]);
                setError('We could not load the ACER laptop collection. Please refresh the page or try again later.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!user) return undefined;
        let cancelled = false;
        cartAPI.getCart()
            .then(({ data }) => {
                if (!cancelled) setCartCount(data?.item_count || 0);
            })
            .catch(() => { });
        return () => {
            cancelled = true;
        };
    }, [user]);
    const { visibleProducts, typeCounts } = useMemo(() => {
        const min = toNumberOrNull(minPrice);
        const max = toNumberOrNull(maxPrice);
        const visible = products
            .filter((product) => activeType === 'ALL' || product.typeproduct === activeType)
            .filter((product) => {
                const price = Number(product.price);
                return (min === null || price >= min) && (max === null || price <= max);
            })
            .sort((first, second) => {
                if (priceSort === 'low-to-high') return Number(first.price) - Number(second.price);
                if (priceSort === 'high-to-low') return Number(second.price) - Number(first.price);
                return 0;
            });
        const counts = { ALL: products.length };
        products.forEach((product) => {
            if (!product.typeproduct) return;
            counts[product.typeproduct] = (counts[product.typeproduct] || 0) + 1;
        });
        return { visibleProducts: visible, typeCounts: counts };
    }, [products, activeType, minPrice, maxPrice, priceSort]);

    const showToast = (message) => {
        setToast(message);
        window.setTimeout(() => setToast(''), 2500);
    };

    const resetFilters = () => {
        setActiveType('ALL');
        setMinPrice('');
        setMaxPrice('');
        setPriceSort('featured');
    };

    const addToCart = async (product) => {
        if (!user) {
            navigate('/login');
            return false;
        }
        try {
            await cartAPI.addItem(product.id, 1);
            setCartCount((count) => count + 1);
            showToast(`${product.name} was added to your cart.`);
            return true;
        } catch {
            showToast('That laptop could not be added to your cart. Please try again.');
            return false;
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
            <nav className="w-full bg-gray-950 px-5 py-2 text-xs text-gray-300">
                <div className="mx-auto flex max-w-7xl items-center justify-end gap-5">
                    <Link to="/help" className="transition-colors hover:text-orange-400">Help &amp; Support</Link>
                    <Link to="/blog" className="transition-colors hover:text-orange-400">Blog</Link>
                    <Link to="/survey" className="transition-colors hover:text-orange-400">Survey</Link>
                </div>
            </nav>

            <nav className="sticky top-0 z-40 w-full border-b border-orange-300 bg-orange-400 px-5 py-3 shadow-sm md:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3">
                    <div className="flex items-center gap-4 md:gap-6">
                        <button type="button" onClick={() => navigate('/')} aria-label="Go to Rigginie home" className="shrink-0">
                            <img src={logo} alt="Rigginie PH" className="h-11 w-auto" />
                        </button>
                        <div className="min-w-0 flex-1"><Searchengine /></div>
                        <div className="flex shrink-0 items-center gap-2">
                            <button type="button" onClick={() => navigate(user ? '/account' : '/login')} aria-label="Account" className="rounded-xl bg-white p-3 text-gray-900 transition-colors hover:text-orange-500">
                                <FaUser />
                            </button>
                            <button type="button" onClick={() => navigate('/cart')} aria-label={`Shopping cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`} className="relative rounded-xl bg-gray-950 p-3 text-white transition-colors hover:bg-orange-600">
                                <MdShoppingCart className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-semibold text-amber-950 items-center">
                        <Link to="/laptops" className="hover:text-white">All laptops</Link>
                        <Link to="/laptops/gigabyte" className="text-white">GIGABYTE</Link>
                        <Link to="/laptops/dell" className="hover:text-white">DELL</Link>
                        <Link to="/laptops/asus" className="hover:text-white">ASUS</Link>
                        <Link to="/laptops/lenovo" className="hover:text-white">LENOVO</Link>
                        <Link to="/laptops/acer" className="hover:text-white">ACER</Link>
                        <Link to="/laptops/apple" className="hover:text-white">APPLE</Link>
                    </div>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 md:px-10">
                <section className="relative overflow-hidden rounded-3xl bg-gray-950 px-6 py-12 md:px-12">
                    <div className="relative z-10 max-w-xl">
                        <div className="mb-4 flex items-center gap-3 text-orange-400">
                            <FaLaptop className="text-3xl" aria-hidden="true" />
                            <span className="text-xs font-bold uppercase tracking-[0.22em]">ACER collection</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">In search of incredible.</h1>
                        <p className="mt-4 max-w-md text-gray-300">
                            Gaming, creative, and everyday laptops from ROG, TUF Gaming, Zenbook, and Vivobook — available across our Philippine branches.
                        </p>
                        <button type="button" onClick={() => document.getElementById('acer-laptops')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400">
                            Browse laptops
                        </button>
                    </div>
                    <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border-28 border-orange-400/20" aria-hidden="true" />
                    <div className="absolute -bottom-36 right-20 h-72 w-72 rounded-full border-18 border-white/10" aria-hidden="true" />
                </section>

                <section id="acer-laptops" className="mt-12 scroll-mt-28">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-1 rounded-full bg-orange-500" aria-hidden="true" />
                        <h2 className="text-xl font-bold">ACER LAPTOPS</h2>
                    </div>
                    <p className="ml-3 mt-1 text-sm text-gray-500">
                        {loading ? 'Loading Acer laptops…' : `${visibleProducts.length} of ${products.length} laptop${products.length === 1 ? '' : 's'} shown`}
                    </p>
                    <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter Acer laptops by type">
                            {LAPTOP_TYPES.map((type) => {
                                const count = typeCounts[type.key] || 0;
                                const active = activeType === type.key;
                                return (
                                    <button
                                        key={type.key}
                                        type="button"
                                        onClick={() => setActiveType(type.key)}
                                        disabled={count === 0}
                                        aria-pressed={active}
                                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${active
                                                ? 'bg-orange-500 text-white'
                                                : count === 0
                                                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                                            }`}
                                    >
                                        {type.label}
                                        <span className={`ml-1 text-[10px] font-bold ${active ? 'text-white/80' : 'text-gray-400'}`}>({count})</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap items-end gap-3">
                            <label className="flex flex-col text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                Min &ntilde;
                                <input
                                    type="number"
                                    min="0"
                                    step="1000"
                                    inputMode="numeric"
                                    value={minPrice}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                    placeholder="0"
                                    className="mt-1 w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-medium text-gray-900 focus:border-orange-400 focus:outline-none"
                                />
                            </label>
                            <label className="flex flex-col text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                Max &ntilde;
                                <input
                                    type="number"
                                    min="0"
                                    step="1000"
                                    inputMode="numeric"
                                    value={maxPrice}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                    placeholder="Any"
                                    className="mt-1 w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-medium text-gray-900 focus:border-orange-400 focus:outline-none"
                                />
                            </label>
                            <label className="flex flex-col text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                Sort by
                                <select
                                    value={priceSort}
                                    onChange={(event) => setPriceSort(event.target.value)}
                                    className="mt-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 focus:border-orange-400 focus:outline-none"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    {loading ? (
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4" aria-busy="true">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="h-64 animate-pulse rounded-xl border border-gray-200 bg-white" />
                            ))}
                        </div>
                    ) : error ? (
                        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm font-medium text-red-600">{error}</p>
                    ) : products.length === 0 ? (
                        <p className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                            No Acer laptops are available right now.{' '}
                            <Link to="/laptops" className="font-semibold text-orange-500 hover:underline">Browse all laptops &rarr;</Link>
                        </p>
                    ) : visibleProducts.length === 0 ? (
                        <p className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                            No Acer laptop matches these filters.{' '}
                            <button type="button" onClick={resetFilters} className="font-semibold text-orange-500 hover:underline">Clear filters</button>
                        </p>
                    ) : (
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
                            {visibleProducts.map((product) => (
                                <AcerProductCard key={product.id} product={product} onAdd={addToCart} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {toast && (
                <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl">
                    {toast}
                </div>
            )}
            <Footer />
        </div>
    );
}
function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-10 border-t-4 border-orange-500 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-center">
                        <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors">Support & Warranty</a></li>
                        <li><a href="/mission-vission" className="hover:text-orange-400 transition-colors">Mission & Vision</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-gray-400 text-center">
                        <li>Email: rigginieph@email.com</li>
                        <li>Phone: +63 09919883132</li>
                        <li>Location: Pasig, Metro Manila</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Join Our Community</h3>
                    <div className="flex flex-wrap gap-5 text-3xl justify-center">
                        <a href="https://www.facebook.com/GHRPH/" className="hover:text-orange-400 transition-colors"><FaFacebook /></a>
                        <a href="https://www.threads.net/@rigginieph" className="hover:text-orange-400 transition-colors"><FaThreads /></a>
                        <a href="https://www.instagram.com/rigginieph" className="hover:text-orange-400 transition-colors"><FaInstagram /></a>
                        <a href="https://www.youtube.com/@RigginiePH" className="hover:text-orange-400 transition-colors"><FaYoutube /></a>
                        <a href="https://t.me/rigginieph" className="hover:text-orange-400 transition-colors"><FaTelegram /></a>
                        <a href="https://discord.gg/rigginieph" className="hover:text-orange-400 transition-colors"><FaDiscord /></a>
                        <a href="https://www.twitch.tv/rigginieph" className="hover:text-orange-400 transition-colors"><FaTwitch /></a>
                    </div>
                </div>
                <div className="md:col-span-3 mt-8 border-t border-gray-800 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-3 text-center">Payment Methods</h3>
                    <div className="flex flex-wrap gap-4 mx-auto justify-center">
                        <img src={gcash} className="h-10 w-auto" alt="GCash" />
                        <img src={paypal} className="h-10 w-auto" alt="PayPal" />
                        <img src={visa} className="h-10 w-auto" alt="Visa" />
                        <img src={maya} className="h-10 w-auto" alt="Maya" />
                        <img src={homecredit} className="h-10 w-auto" alt="Home Credit" />
                        <img src={mastercard} className="h-10 w-auto" alt="Mastercard" />
                        <img src={usdt} className="h-10 w-auto" alt="USDT" />
                        <img src={ethereum} className="h-10 w-auto" alt="Ethereum" />
                        <img src={btc} className="h-10 w-auto" alt="Bitcoin" />
                        <img src={xmr} className="h-10 w-auto" alt="Monero" />
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-sm text-gray-500">
                © {new Date().getFullYear()} Rigginie PH. All rights reserved.
            </div>
        </footer>
    );
}
function AcerProductCard({ product, onAdd }) {
    const [added, setAdded] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const imageUrl = imageFailed ? null : remoteProductImage(product.mainimg || product.img1);
    const outOfStock = product.status === 'out_of_stock' || product.stock === 0;
    const typeLabel = TYPE_LABELS[product.typeproduct];

    const handleAdd = async () => {
        const wasAdded = await onAdd(product);
        if (!wasAdded) return;
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
    };

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <Link to={`/product/${product.id}`} className="relative flex h-36 items-center justify-center bg-linear-to-br from-gray-100 to-gray-300 p-4 sm:h-44">
                {imageUrl ? (
                    <img src={imageUrl} alt={product.name} loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-contain transition duration-300 hover:scale-105" />
                ) : (
                    <FaLaptop className="text-5xl text-gray-400" aria-hidden="true" />
                )}
                {typeLabel && (
                    <span className="absolute left-2 top-2 rounded bg-gray-950/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{typeLabel}</span>
                )}
                {product.status === 'low_stock' && (
                    <span className="absolute right-2 top-2 rounded bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950">Low stock</span>
                )}
            </Link>
            <div className="flex flex-1 flex-col p-3">
                <h3 className="min-h-10 text-xs font-semibold leading-snug text-gray-800">{product.name}</h3>
                <p className="mt-2 text-base font-bold text-orange-500">₱ {Number(product.price).toLocaleString()}</p>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={outOfStock}
                    className={`mt-auto rounded py-2 text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300 ${added ? 'bg-green-500' : 'bg-gray-950 hover:bg-orange-500'}`}
                >
                    {outOfStock ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart'}
                </button>
            </div>
        </article>
    );
}

export default Acer;