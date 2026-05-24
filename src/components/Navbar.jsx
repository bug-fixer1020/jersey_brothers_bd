'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

// Import your logo
import logo from '../../public/assets/logo.jpg';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to check if link is active
  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: 'Jersey', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo - Using Next Image */}
            <Link href="/" className="flex items-center">
              <Image 
                src={logo} 
                alt="Jersey Brother BD" 
                width={150} 
                height={50} 
                className="h-12 w-auto object-contain rounded-full"
                priority
              />
            </Link>
            
            {/* Desktop Navigation - Bright Underline for Active Tab */}
            <div className="hidden md:flex items-center space-x-1 h-full">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`relative px-4 h-20 flex items-center text-sm font-semibold transition-all duration-200 ${
                    isActive(link.href) 
                      ? 'text-blue-600 border-b-4 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600 border-b-4 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Desktop Icons & Auth */}
            <div className="hidden md:flex items-center space-x-5">
              <div className="flex items-center space-x-3">
                <Link 
                  href="/profile?tab=favorites" 
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isActive('/profile?tab=favorites') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                >
                  <span className="text-xl">❤️</span>
                </Link>
                <Link 
                  href="/profile?tab=cart" 
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isActive('/profile?tab=cart') ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                >
                  <span className="text-xl">🛒</span>
                </Link>
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

              {session ? (
                <div className="relative group py-2">
                  <button className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
                    <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    {/* <span className="hidden lg:block">{session.user.name?.split(' ')[0]}</span> */}
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full w-52 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-1">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                       <p className="text-xs text-gray-400 uppercase tracking-wider">Account</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      My Profile
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button 
                      onClick={() => signOut()} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all active:scale-95"
                >
                  Login
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        session={session}
        signOut={signOut}
      />
    </>
  );
}