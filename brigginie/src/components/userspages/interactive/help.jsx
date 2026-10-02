import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { authAPI, clearAuthData, getUser, cartAPI } from '../../../services/api';
import logo from '../../../assets/logo.png';
import gcash from '../../../assets/gcash.png';
import paypal from '../../../assets/paypal.png';
import visa from '../../../assets/visa.png';
import maya from '../../../assets/maya.png';
import homecredit from '../../../assets/homecredit.png';
import mastercard from '../../../assets/mastercard.png';
import usdt from '../../../assets/usdt.png';
import ethereum from '../../../assets/ethereum.png';
import xmr from '../../../assets/xmr.png';
import btc from '../../../assets/btc.png';

import { FaThreads } from 'react-icons/fa6';
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaDiscord, FaTwitch, FaUser } from 'react-icons/fa';
import { MdLogout, MdHistory, MdShoppingCart } from 'react-icons/md';
import {
  Headphones, Package, Truck, RotateCcw, Shield, CreditCard, UserRound,
  Search, ChevronDown, Mail, Phone, MapPin, MessageCircle, Clock,
} from 'lucide-react';

const TOPICS = [
  { id: 'orders', title: 'Orders', desc: 'Track, change, or cancel a purchase', icon: Package, color: 'bg-orange-50 text-orange-600' },
  { id: 'shipping', title: 'Shipping', desc: 'Delivery times and coverage', icon: Truck, color: 'bg-sky-50 text-sky-600' },
  { id: 'returns', title: 'Returns', desc: 'Refunds and replacements', icon: RotateCcw, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'warranty', title: 'Warranty', desc: 'Coverage and RMA process', icon: Shield, color: 'bg-violet-50 text-violet-600' },
  { id: 'payments', title: 'Payments', desc: 'GCash, cards, and crypto', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
  { id: 'account', title: 'Account', desc: 'Login, profile, and security', icon: UserRound, color: 'bg-rose-50 text-rose-600' },
];

const FAQS = [
  {
    topic: 'orders', q: 'How do I track my order?',
    a: 'Sign in, open Purchase History from your account menu, and select the order. You will see payment status, packing updates, and the courier tracking number once it ships.',
  },
  {
    topic: 'orders', q: 'Can I cancel or change an order?',
    a: 'You can request a change or cancellation before the order is packed. Contact support with your order number. After packing or dispatch we cannot edit items, but you can start a return once it arrives.',
  },
  {
    topic: 'shipping', q: 'How long does delivery take?',
    a: 'Metro Manila orders usually arrive in 1–3 business days after payment is confirmed. Provincial deliveries typically take 3–7 business days depending on the courier and destination.',
  },
  {
    topic: 'shipping', q: 'Do you ship nationwide?',
    a: 'Yes. We ship across the Philippines from Pasig, Metro Manila. Remote areas may take longer and some bulky PC cases or servers may need special freight.',
  },
  {
    topic: 'returns', q: 'What is your return policy?',
    a: 'Unused items in original packaging can be returned within 7 days of delivery. Opened components may be eligible for a replacement if they fail on arrival. Proof of purchase is required.',
  },
  {
    topic: 'returns', q: 'When will I get my refund?',
    a: 'Once we inspect the returned item, refunds go back to the original payment method. GCash, Maya, and card refunds usually take 3–5 business days. Crypto refunds are processed as store credit unless otherwise arranged.',
  },
  {
    topic: 'warranty', q: 'Are products covered by warranty?',
    a: 'Brand-new parts carry the manufacturer warranty (typically 1–3 years). Pre-built PCs from Rigginie include assembly support. Keep your invoice; we will help you with RMA through the brand when needed.',
  },
  {
    topic: 'warranty', q: 'What if my PC or part arrives DOA?',
    a: 'Contact us within 48 hours with photos or a short video of the issue and your order number. Dead-on-arrival units are replaced or refunded after our team confirms the fault.',
  },
  {
    topic: 'payments', q: 'Which payment methods do you accept?',
    a: 'We accept GCash, Maya, Visa, Mastercard, PayPal, Home Credit, USDT, Ethereum, Bitcoin, and Monero. Orders stay pending until payment is confirmed.',
  },
  {
    topic: 'payments', q: 'Is checkout secure?',
    a: 'Yes. Card and e-wallet payments are processed through our payment partners. We never store full card numbers on Rigginie servers.',
  },
  {
    topic: 'account', q: 'I forgot my password. What should I do?',
    a: 'Use Forgot Password on the login page. We will email a reset link to the address on your account. Check spam if it does not arrive within a few minutes.',
  },
  {
    topic: 'account', q: 'How do I update my delivery details?',
    a: 'Open My Profile after signing in and update your name, phone, and address before placing a new order. For an existing unpaid order, message support with the new details.',
  },
];

function Help() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', order: '', message: '' });
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user) {
      cartAPI.getCart().then((res) => setCart(res.data)).catch(() => { });
    }
  }, []);

  const filteredFaqs = FAQS.filter((item) => {
    const matchesTopic = activeTopic === 'all' || item.topic === activeTopic;
    const haystack = `${item.q} ${item.a}`.toLowerCase();
    const matchesQuery = !query.trim() || haystack.includes(query.trim().toLowerCase());
    return matchesTopic && matchesQuery;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', order: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full bg-black py-1 px-2 flex justify-end items-center gap-x-3">
        <a onClick={() => navigate('/help')} className="font-medium hover:underline text-amber-100 cursor-pointer">Help & Support</a>
        <a onClick={() => navigate('/blog')} className="font-medium hover:underline text-amber-100 cursor-pointer">Blog</a>
        <a onClick={() => navigate('/survey')} className="font-medium hover:underline text-amber-100 cursor-pointer">Survey</a>
      </nav>

      <nav className="w-full bg-orange-500 py-5 px-7 md:px-10 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-12 w-auto cursor-pointer" />
          </button>
          <div className="hidden md:flex flex-1 justify-center items-center gap-5 text-white font-medium text-sm lg:text-base">
            <Link to="/pc-stores" className="hover:text-orange-200 transition-colors px-4 py-2">PC STORE</Link>
            <Link to="/laptops" className="hover:text-orange-200 transition-colors px-4 py-2">LAPTOPS</Link>
            <Link to="/networking" className="hover:text-orange-200 transition-colors px-4 py-2">NETWORKING</Link>
            <Link to="/servers" className="hover:text-orange-200 transition-colors px-4 py-2">SERVERS</Link>
            <Link to="/ai-build" className="hover:text-orange-200 transition-colors px-4 py-2">AI BUILD</Link>
          </div>
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button onClick={() => navigate('/cart')}
              className="relative bg-white text-orange-500 p-3 rounded hover:bg-gray-100 transition-colors">
              <MdShoppingCart className="text-xl" />
              {cart?.item_count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.item_count > 99 ? '99+' : cart.item_count}
                </span>
              )}
            </button>
            {user ? <ProfileDropdown user={user} /> : (
              <button onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-white text-orange-500 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition-colors">
                <FaUser className="text-sm" /><span>Account</span>
              </button>
            )}
          </div>
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden text-white text-4xl focus:outline-none">
            {isNavOpen ? '✕' : '☰'}
          </button>
        </div>

        {isNavOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-orange-400 bg-orange-500">
            <div className="flex flex-col gap-4 text-white font-medium text-center py-4">
              <Link to="/pc-stores" className="hover:text-orange-200 transition-colors px-4 py-2">PC STORE</Link>
              <Link to="/laptops" className="hover:text-orange-200 transition-colors px-4 py-2">LAPTOPS</Link>
              <Link to="/networking" className="hover:text-orange-200 transition-colors px-4 py-2">NETWORKING</Link>
              <Link to="/servers" className="hover:text-orange-200 transition-colors px-4 py-2">SERVERS</Link>
              <Link to="/ai-build" className="hover:text-orange-200 transition-colors px-4 py-2">AI BUILD</Link>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button onClick={() => { setIsNavOpen(false); navigate('/cart'); }}
                  className="relative bg-white text-orange-500 p-3 rounded hover:bg-gray-100">
                  <MdShoppingCart className="text-xl" />
                  {cart?.item_count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.item_count > 99 ? '99+' : cart.item_count}
                    </span>
                  )}
                </button>
                <button className="flex items-center gap-2 bg-white text-orange-500 font-semibold px-8 py-3 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => { setIsNavOpen(false); user ? navigate('/profile') : navigate('/login'); }}>
                  <FaUser className="text-sm" />
                  <span>{user ? `${user.firstName}'s Profile` : 'Account'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
              <Headphones className="w-4 h-4 text-orange-300" />
              Help Center
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">How can we help you today?</h1>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              Find answers about orders, shipping, returns, warranty, and payments — or send our team a message.
            </p>
            <div className="relative max-w-xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help articles, e.g. track order, warranty, GCash"
                className="w-full rounded-xl bg-white text-gray-800 pl-12 pr-4 py-3.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              const selected = activeTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => { setActiveTopic(selected ? 'all' : topic.id); setOpenFaq(null); }}
                  className={`text-left bg-white rounded-xl border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${selected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}
                >
                  <span className={`inline-flex w-11 h-11 items-center justify-center rounded-lg ${topic.color}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <h2 className="font-semibold text-gray-800 mt-3">{topic.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{topic.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Frequently asked questions</h2>
                {activeTopic !== 'all' && (
                  <button onClick={() => setActiveTopic('all')} className="text-sm text-orange-600 font-medium hover:underline">
                    Show all
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {filteredFaqs.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                    No matching articles. Try another search or browse a topic above.
                  </div>
                ) : filteredFaqs.map((item, index) => {
                  const isOpen = openFaq === `${item.q}-${index}`;
                  return (
                    <div key={`${item.q}-${index}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : `${item.q}-${index}`)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-gray-800 hover:bg-orange-50 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-orange-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Contact Rigginie PH</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3"><Mail className="w-4 h-4 text-orange-500 mt-0.5" />rigginieph@email.com</li>
                  <li className="flex items-start gap-3"><Phone className="w-4 h-4 text-orange-500 mt-0.5" />+63 09919883132</li>
                  <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-orange-500 mt-0.5" />Pasig, Metro Manila</li>
                  <li className="flex items-start gap-3"><Clock className="w-4 h-4 text-orange-500 mt-0.5" />Mon–Sat, 9:00 AM – 6:00 PM</li>
                </ul>
                <button
                  onClick={() => navigate('/chatbot')}
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat with Shilja
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-1">Send a support request</h3>
                <p className="text-sm text-gray-500 mb-4">We typically reply within one business day.</p>
                {sent ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-4 py-3 text-sm">
                    Thanks — your message was received. Our team will follow up by email.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Email address"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      placeholder="Order number (optional)"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                    <button type="submit" className="w-full bg-gray-950 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-500 transition-colors">
                      Submit request
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-10 border-t-4 border-orange-500 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Support & Warranty</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Mission & Vision</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: rigginieph@email.com</li>
            <li>Phone: +63 09919883132</li>
            <li>Location: Pasig, Metro Manila</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Join Our Community</h3>
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
          <h3 className="text-lg font-semibold text-white mb-3">Payment Methods</h3>
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
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rigginie PH. All rights reserved.
      </div>
    </footer>
  );
}

function ProfileDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout(localStorage.getItem('refresh_token'));
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      clearAuthData();
      setIsOpen(false);
      window.location.href = '/';
    }
  };
  const handleNavigation = (path) => { navigate(path); setIsOpen(false); };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white text-orange-500 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition-colors">
        <FaUser className="text-sm" />
        <span>{user?.firstName || 'Account'}</span>
        <span className="text-xl">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
          <div className="bg-orange-50 border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div data-role={user?.usertype || user?.userType || user?.user_type || user?.role || 'enthusiast'} className="profile-role-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <button onClick={() => handleNavigation('/profile')}
              className="w-full px-4 py-2 hover:bg-orange-50 transition-colors flex items-center gap-3 text-gray-700 text-left">
              <FaUser className="text-orange-500" /><span>My Profile</span>
            </button>
            <button onClick={() => handleNavigation('/purchase-history')}
              className="w-full px-4 py-2 hover:bg-orange-50 transition-colors flex items-center gap-3 text-gray-700 text-left">
              <MdHistory className="text-orange-500 text-lg" /><span>Purchase History</span>
            </button>
            <button onClick={() => handleNavigation('/cart')}
              className="w-full px-4 py-2 hover:bg-orange-50 transition-colors flex items-center gap-3 text-gray-700 text-left">
              <MdShoppingCart className="text-orange-500 text-lg" /><span>Shopping Cart</span>
            </button>
            {user?.role === 'admin' && (
              <button onClick={() => handleNavigation('/admin')}
                className="w-full px-4 py-2 hover:bg-orange-50 transition-colors flex items-center gap-3 text-gray-700 text-left">
                <FaUser className="text-orange-500" /><span>Admin Dashboard</span>
              </button>
            )}
          </div>
          <div className="border-t border-gray-200 p-2">
            <button onClick={handleLogout}
              className="w-full px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-semibold text-left rounded">
              <MdLogout className="text-lg" /><span>Logout</span>
            </button>
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}

export default Help;
