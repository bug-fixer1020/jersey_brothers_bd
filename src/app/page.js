import Link from 'next/link';
import Hero from './(Sections)/hero/page.jsx';
export default function HomePage() {
  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Jerseys</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold mb-2">Player Version</h3>
            <p className="text-gray-600">Authentic match quality</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">👕</div>
            <h3 className="text-xl font-semibold mb-2">Fan Version</h3>
            <p className="text-gray-600">Comfortable for everyday wear</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
            <p className="text-gray-600">Personalize your jersey</p>
          </div>
        </div>
      </div>
    </div>
  );
}