import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Minimize2, Maximize2, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';
import type { MatchedItem } from '../App';

interface Message {
  id: string;
  sender: 'lost' | 'found';
  text: string;
  timestamp: Date;
  type?: 'text' | 'contact';
}

interface ChatInterfaceProps {
  match: MatchedItem;
  onClose: () => void;
}

export default function ChatInterface({ match, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'found',
      text: `Hi! I found a ${match.foundItem.itemName}. Is this yours?`,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      sender: 'lost',
      text: 'Yes! That looks like mine. Where did you find it?',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      sender: 'found',
      text: `I found it at ${match.foundItem.location}. Would you like to meet to collect it?`,
      timestamp: new Date(Date.now() - 3400000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showContactShare, setShowContactShare] = useState(false);
  const [showReunitedDialog, setShowReunitedDialog] = useState(false);
  const [contactShared, setContactShared] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate online status changes
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% online
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'lost',
        text: newMessage,
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        // Simulate response
        const responses = [
          "Sure! When would you like to meet?",
          "That works for me. See you then!",
          "Great! I'll bring the item."
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'found',
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleShareContact = () => {
    const contactMessage: Message = {
      id: Date.now().toString(),
      sender: 'lost',
      text: '📧 Contact Info Shared',
      timestamp: new Date(),
      type: 'contact'
    };
    setMessages([...messages, contactMessage]);
    setContactShared(true);
    setShowContactShare(false);
    toast.success('Contact information shared successfully!');
  };

  const handleMarkReunited = () => {
    setShowReunitedDialog(false);
    toast.success('Great! Item marked as successfully reunited! 🎉');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]"
        >
          <Card className="shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 bg-white/20 flex-shrink-0">
                    <AvatarFallback className="text-white">
                      {getInitials(match.foundItem.foundBy)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{match.foundItem.foundBy}</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-300' : 'bg-gray-400'}`} />
                      <p className="text-xs text-teal-100">
                        {isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Match Info */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                {match.foundItem.image && (
                  <img 
                    src={match.foundItem.image}
                    alt={match.foundItem.itemName}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{match.foundItem.itemName}</p>
                  <Badge className="bg-green-400/20 text-green-100 hover:bg-green-400/30 border-green-300/30 mt-1 text-xs">
                    Matched & Verified • {match.matchConfidence}%
                  </Badge>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${message.sender === 'lost' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${message.sender === 'lost' ? 'order-2' : 'order-1'}`}>
                        <div className="flex items-end gap-2">
                          {message.sender === 'found' && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                                {getInitials(match.foundItem.foundBy)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            {message.type === 'contact' ? (
                              <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-blue-700">{message.text}</span>
                              </div>
                            ) : (
                              <div
                                className={`rounded-2xl px-4 py-2 ${
                                  message.sender === 'lost'
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                }`}
                              >
                                <p className="text-sm break-words">{message.text}</p>
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-1 px-2">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                          {message.sender === 'lost' && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                {getInitials(match.lostItem.reportedBy)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-end gap-2"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                          {getInitials(match.foundItem.foundBy)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 self-end mb-1">typing...</p>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Action Buttons */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex gap-2">
                  <Button
                    onClick={() => setShowContactShare(true)}
                    disabled={contactShared}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    {contactShared ? 'Contact Shared' : 'Share Contact'}
                  </Button>
                  <Button
                    onClick={() => setShowReunitedDialog(true)}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Mark Reunited
                  </Button>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Contact Share Dialog */}
      <Dialog open={showContactShare} onOpenChange={setShowContactShare}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Contact Information</DialogTitle>
            <DialogDescription>
              Are you sure you want to share your contact information with {match.foundItem.foundBy}? 
              This will allow them to reach you directly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-700">Email</p>
                <p className="text-xs text-gray-500">{match.lostItem.reportedBy.toLowerCase().replace(' ', '.')}@nirmauni.ac.in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-700">Phone</p>
                <p className="text-xs text-gray-500">+91 98765 43210</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactShare(false)}>
              Cancel
            </Button>
            <Button onClick={handleShareContact} className="bg-gradient-to-r from-blue-500 to-blue-600">
              Share Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reunited Confirmation Dialog */}
      <Dialog open={showReunitedDialog} onOpenChange={setShowReunitedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Item as Reunited?</DialogTitle>
            <DialogDescription>
              Are you sure you've successfully retrieved your {match.foundItem.itemName}? 
              This will close the case and mark it as resolved.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm">Thank you for using our service!</p>
                <p className="text-xs text-gray-600 mt-1">
                  We're glad you found your item. This will help us improve our matching system.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReunitedDialog(false)}>
              Not Yet
            </Button>
            <Button 
              onClick={handleMarkReunited} 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Yes, Mark as Reunited
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
