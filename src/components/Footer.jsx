import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  ArrowUpRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-block">
              <h2 className="text-2xl font-bold tracking-tighter transition-colors duration-300 group-hover:text-zinc-400">
                JERSEY BROTHER <span className="text-zinc-500 italic font-light">BD</span>
              </h2>
            </Link>

            <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-xs">
              Elevating the game through premium aesthetics and unparalleled quality. Your ultimate destination for elite kits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
              Collections
            </h3>

            <ul className="space-y-4">
              {[
                'New Arrivals',
                'Club Kits',
                'National Teams',
                'Retro Classics',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    {item}

                    <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
              Support
            </h3>

            <ul className="space-y-4">
              {[
                'Order Tracking',
                'Size Guide',
                'Shipping Policy',
                'Terms of Service',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                Get in touch
              </h3>

              <a
                href="mailto:jerseybrothersbd@gmail.com"
                className="text-sm font-medium hover:text-zinc-400 transition-colors break-all"
              >
                jerseybrothersbd@gmail.com
              </a>
            </div>

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/jerseybrothersbd"
                target="_blank"
                className="p-3 rounded-full border border-zinc-800 hover:border-zinc-400 transition-all duration-300 group"
              >
                <span className="w-5 h-5 text-zinc-400 group-hover:text-white text-lg">
                  📷
                </span>
              </Link>

              <Link
                href="https://www.facebook.com/jerseybrothersbd"
                target="_blank"
                className="p-3 rounded-full border border-zinc-800 hover:border-zinc-400 transition-all duration-300 group"
              >
                <span className="w-5 h-5 text-zinc-400 group-hover:text-white text-lg">
                  📘
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} Jersey Brother BD — All Rights Reserved.
          </div>

          {/* Payment Icons / Security */}
          <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="w-8 h-5 bg-zinc-700 rounded-sm italic font-black text-[8px] flex items-center justify-center text-black">
              VISA
            </div>

            <div className="w-8 h-5 bg-zinc-700 rounded-sm italic font-black text-[8px] flex items-center justify-center text-black">
              MC
            </div>

            <div className="w-8 h-5 bg-zinc-700 rounded-sm italic font-black text-[8px] flex items-center justify-center text-black">
              BKASH
            </div>
          </div>
        </div>
      </div>

      {/* Modern Soft Glow Decor */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;