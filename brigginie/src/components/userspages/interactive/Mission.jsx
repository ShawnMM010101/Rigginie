import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
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
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaDiscord, FaTwitch, FaUser, FaRobot, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function Mission() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex-col">
      <nav className="w-full bg-gray-950 px-5 py-2 text-xs text-gray-300">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-5">
          <a onClick={() => navigate('/help')} className="hover:text-orange-400 cursor-pointer transition-colors">Help & Support</a>
          <a onClick={() => navigate('/blog')} className="hover:text-orange-400 cursor-pointer transition-colors">Blog</a>
          <a onClick={() => navigate('/survey')} className="hover:text-orange-400 cursor-pointer transition-colors">Survey</a>
        </div>
      </nav>
      <nav className='fixed w-full bg-orange-400 py-3 px-5 md:px1'>
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
          <button onClick={() => navigate('/')} className="shrink-0">
          <img src={logo} alt="Rigginie PH" className="h-11 w-auto cursor-pointer object-centerq" />
          </button>
        </div>
      </nav>
        <main className="flex justify-around items-center flex-col md:flex-row mt-20 md:mt-32 px-5 md:px-10">
            <div className="max-w-2xl text-center md:text-left font-['IBM_Plex_Mono']">
                <p className="font-bold text-red-500 text-6xl">MISSION</p>
                <p className="text-gray-700 text-lg mt-5 font-mono">Our mission is to provide a platform that empowers individuals and businesses to achieve their goals through innovative solutions, exceptional service, and a commitment to excellence.</p>
            </div>
        </main>
      <Footer />
    </div>
  )
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
                        <li><a href="#" className="hover:text-orange-400 transition-colors">Mission & Vision</a></li>
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

export default Mission;
