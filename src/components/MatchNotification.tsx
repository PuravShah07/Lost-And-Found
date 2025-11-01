import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { MatchedItem } from '../App';

interface MatchNotificationProps {
  match: MatchedItem;
  isOpen: boolean;
  onStartChat: () => void;
  onClose: () => void;
}

export default function MatchNotification({ 
  match, 
  isOpen, 
  onStartChat, 
  onClose 
}: MatchNotificationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Notification Card */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <Card className="w-full max-w-md p-8 bg-white shadow-2xl">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="relative mx-auto w-20 h-20 mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute -inset-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-0" />
                    <Sparkles className="w-4 h-4 text-teal-400 absolute bottom-0 left-0" />
                    <Sparkles className="w-5 h-5 text-green-400 absolute top-1/2 left-0" />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h2 className="mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    A Match Has Been Found!
                  </h2>
                  <p className="text-gray-600">
                    You can now chat with the other person to confirm and claim your item.
                  </p>
                </motion.div>

                {/* Match Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-teal-200"
                >
                  <div className="flex items-center gap-4">
                    {match.foundItem.image && (
                      <img 
                        src={match.foundItem.image}
                        alt={match.foundItem.itemName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="mb-1">{match.foundItem.itemName}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          {match.matchConfidence}% Match
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Found at {match.foundItem.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
                  >
                    Later
                  </Button>
                  <Button
                    onClick={onStartChat}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
