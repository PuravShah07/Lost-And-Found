import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import HomePage from './components/HomePage';
import LostItemForm from './components/LostItemForm';
import FoundItemForm from './components/FoundItemForm';
import AdminPanel from './components/AdminPanel';
import ChatInterface from './components/ChatInterface';
import MatchNotification from './components/MatchNotification';
import LostUserSignIn from './components/LostUserSignIn';
import FoundUserSignIn from './components/FoundUserSignIn';
import AdminSignIn from './components/AdminSignIn';

export type Page = 'home' | 'lost-signin' | 'lost' | 'found-signin' | 'found' | 'admin-signin' | 'admin';

export interface LostItem {
  id: string;
  itemName: string;
  description: string;
  location?: string;
  date: string;
  time?: string;
  image?: string;
  reportedBy: string;
}

export interface FoundItem {
  id: string;
  itemName: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  foundBy: string;
}

export interface MatchedItem {
  id: string;
  lostItem: LostItem;
  foundItem: FoundItem;
  matchConfidence: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLostAuthenticated, setIsLostAuthenticated] = useState(false);
  const [isFoundAuthenticated, setIsFoundAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [lostItems, setLostItems] = useState<LostItem[]>([
    {
      id: '1',
      itemName: 'Blue Backpack',
      description: 'Navy blue Jansport backpack with laptop inside',
      location: 'Library 3rd floor',
      date: '2025-10-28',
      time: '14:30',
      reportedBy: 'John Doe'
    },
    {
      id: '2',
      itemName: 'iPhone 13',
      description: 'Black iPhone 13 with cracked screen protector',
      location: 'Cafeteria',
      date: '2025-10-29',
      reportedBy: 'Jane Smith'
    }
  ]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([
    {
      id: '1',
      itemName: 'Blue Backpack',
      description: 'Navy blue backpack found near study area',
      location: 'Library 3rd floor',
      date: '2025-10-28',
      time: '15:00',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      foundBy: 'Mike Johnson'
    }
  ]);
  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([
    {
      id: '1',
      lostItem: lostItems[0],
      foundItem: foundItems[0],
      matchConfidence: 95
    }
  ]);
  const [showChat, setShowChat] = useState(false);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchedItem | null>(null);

  const handleAddLostItem = (item: Omit<LostItem, 'id'>) => {
    const newItem: LostItem = {
      ...item,
      id: Date.now().toString()
    };
    setLostItems([...lostItems, newItem]);
    setCurrentPage('home');
  };

  const handleAddFoundItem = (item: Omit<FoundItem, 'id'>) => {
    const newItem: FoundItem = {
      ...item,
      id: Date.now().toString()
    };
    setFoundItems([...foundItems, newItem]);
    setCurrentPage('home');
    
    // Simulate finding a match after submitting a found item
    setTimeout(() => {
      // Check if there's a potential match with existing lost items
      const potentialMatch = lostItems.find(lostItem => 
        lostItem.itemName.toLowerCase().includes(item.itemName.toLowerCase().split(' ')[0])
      );
      
      if (potentialMatch) {
        const match: MatchedItem = {
          id: Date.now().toString(),
          lostItem: potentialMatch,
          foundItem: newItem,
          matchConfidence: Math.floor(Math.random() * 20) + 80 // 80-100%
        };
        setSelectedMatch(match);
        setShowMatchNotification(true);
      }
    }, 2000);
  };

  const handleOpenChat = (match: MatchedItem) => {
    setSelectedMatch(match);
    setShowMatchNotification(true);
  };

  const handleStartChat = () => {
    setShowMatchNotification(false);
    setShowChat(true);
  };

  const handleNavigate = (page: Page) => {
    // Route to sign-in pages first if not authenticated
    if (page === 'lost' && !isLostAuthenticated) {
      setCurrentPage('lost-signin');
    } else if (page === 'found' && !isFoundAuthenticated) {
      setCurrentPage('found-signin');
    } else if (page === 'admin' && !isAdminAuthenticated) {
      setCurrentPage('admin-signin');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && (
              <HomePage onNavigate={handleNavigate} />
            )}
            {currentPage === 'lost-signin' && (
              <LostUserSignIn 
                onSuccess={() => {
                  setIsLostAuthenticated(true);
                  setCurrentPage('lost');
                }}
                onBack={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'lost' && (
              <LostItemForm 
                onSubmit={handleAddLostItem}
                onBack={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'found-signin' && (
              <FoundUserSignIn 
                onSuccess={() => {
                  setIsFoundAuthenticated(true);
                  setCurrentPage('found');
                }}
                onBack={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'found' && (
              <FoundItemForm 
                onSubmit={handleAddFoundItem}
                onBack={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'admin-signin' && (
              <AdminSignIn 
                onSuccess={() => {
                  setIsAdminAuthenticated(true);
                  setCurrentPage('admin');
                }}
                onBack={() => setCurrentPage('home')}
              />
            )}
            {currentPage === 'admin' && (
              <AdminPanel 
                lostItems={lostItems}
                foundItems={foundItems}
                matchedItems={matchedItems}
                onBack={() => setCurrentPage('home')}
                onOpenChat={handleOpenChat}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {selectedMatch && (
          <>
            <MatchNotification 
              match={selectedMatch}
              isOpen={showMatchNotification}
              onStartChat={handleStartChat}
              onClose={() => setShowMatchNotification(false)}
            />
            
            {showChat && (
              <ChatInterface 
                match={selectedMatch}
                onClose={() => setShowChat(false)}
              />
            )}
          </>
        )}
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
