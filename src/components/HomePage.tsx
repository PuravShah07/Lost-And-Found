import { motion } from 'motion/react';
import { Search, Package, Shield } from 'lucide-react';
import { Card } from './ui/card';
import type { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const cards = [
    {
      id: 'lost',
      title: 'Lost an Item',
      icon: Search,
      description: 'Report a lost item and get help finding it',
      gradient: 'from-blue-400 to-blue-600',
      page: 'lost' as Page
    },
    {
      id: 'found',
      title: 'Found an Item',
      description: 'Help someone by reporting a found item',
      icon: Package,
      gradient: 'from-teal-400 to-teal-600',
      page: 'found' as Page
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      description: 'Manage and match lost and found items',
      icon: Shield,
      gradient: 'from-indigo-400 to-indigo-600',
      page: 'admin' as Page
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section 
        className="flex-1 flex flex-col items-center justify-center px-4 py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Digital Lost-and-Found Board
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Helping students reunite with their belongings.
          </p>
        </motion.div>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl px-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-8 cursor-pointer bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-blue-200 transition-all duration-300 shadow-lg hover:shadow-2xl h-full"
                onClick={() => onNavigate(card.page)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 mx-auto`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-center mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {card.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
