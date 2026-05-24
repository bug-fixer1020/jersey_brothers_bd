import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose, session, signOut }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <button onClick={onClose} className="float-right text-gray-600">
            ✕
          </button>
          <div className="clear-both"></div>
          <div className="mt-8 space-y-4">
            <Link href="/products" className="block py-2 text-gray-700" onClick={onClose}>
              Jersey
            </Link>
            <Link href="/about" className="block py-2 text-gray-700" onClick={onClose}>
              About Us
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700" onClick={onClose}>
              Contact
            </Link>
            <Link href="/favorites" className="block py-2 text-gray-700" onClick={onClose}>
              ❤️ Favorites
            </Link>
            <Link href="/cart" className="block py-2 text-gray-700" onClick={onClose}>
              🛒 Cart
            </Link>
            {session ? (
              <>
                <Link href="/profile" className="block py-2 text-gray-700" onClick={onClose}>
                  👤 Profile
                </Link>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="block py-2 text-gray-700" onClick={onClose}>
                    Admin Panel
                  </Link>
                )}
                <button onClick={() => { signOut(); onClose(); }} className="block w-full text-left py-2 text-gray-700">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 text-gray-700" onClick={onClose}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}