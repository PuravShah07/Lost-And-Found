import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Filter, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { LostItem, FoundItem, MatchedItem } from '../App';

interface AdminPanelProps {
  lostItems: LostItem[];
  foundItems: FoundItem[];
  matchedItems: MatchedItem[];
  onBack: () => void;
  onOpenChat: (match: MatchedItem) => void;
}

export default function AdminPanel({ 
  lostItems, 
  foundItems, 
  matchedItems, 
  onBack,
  onOpenChat
}: AdminPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('all');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterDate} onValueChange={setFilterDate}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="lost" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lost">
              Lost Items ({lostItems.length})
            </TabsTrigger>
            <TabsTrigger value="found">
              Found Items ({foundItems.length})
            </TabsTrigger>
            <TabsTrigger value="matched">
              Matched Items ({matchedItems.length})
            </TabsTrigger>
          </TabsList>

          {/* Lost Items Tab */}
          <TabsContent value="lost">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lostItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.itemName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="mb-2">{item.itemName}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      {item.location && (
                        <p className="text-gray-500">
                          <span className="text-gray-700">Location:</span> {item.location}
                        </p>
                      )}
                      <p className="text-gray-500">
                        <span className="text-gray-700">Date:</span> {item.date}
                        {item.time && ` at ${item.time}`}
                      </p>
                      <p className="text-gray-500">
                        <span className="text-gray-700">Reported by:</span> {item.reportedBy}
                      </p>
                    </div>
                    <Badge className="mt-3 bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Lost
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Found Items Tab */}
          <TabsContent value="found">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <img 
                      src={item.image} 
                      alt={item.itemName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="mb-2">{item.itemName}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-500">
                        <span className="text-gray-700">Location:</span> {item.location}
                      </p>
                      <p className="text-gray-500">
                        <span className="text-gray-700">Date:</span> {item.date} at {item.time}
                      </p>
                      <p className="text-gray-500">
                        <span className="text-gray-700">Found by:</span> {item.foundBy}
                      </p>
                    </div>
                    <Badge className="mt-3 bg-teal-100 text-teal-700 hover:bg-teal-200">
                      Found
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Matched Items Tab */}
          <TabsContent value="matched">
            <div className="space-y-6">
              {matchedItems.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3>Potential Match</h3>
                      <Badge 
                        className={`${
                          match.matchConfidence > 80 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {match.matchConfidence}% Match
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Lost Item */}
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                        <h4 className="mb-3 text-blue-700">Lost Item</h4>
                        {match.lostItem.image && (
                          <img 
                            src={match.lostItem.image}
                            alt={match.lostItem.itemName}
                            className="w-full h-40 object-cover rounded mb-3"
                          />
                        )}
                        <p className="mb-2">{match.lostItem.itemName}</p>
                        <p className="text-sm text-gray-600 mb-2">{match.lostItem.description}</p>
                        <p className="text-sm text-gray-500">
                          Reported by {match.lostItem.reportedBy}
                        </p>
                      </div>

                      {/* Found Item */}
                      <div className="border border-teal-200 rounded-lg p-4 bg-teal-50/30">
                        <h4 className="mb-3 text-teal-700">Found Item</h4>
                        <img 
                          src={match.foundItem.image}
                          alt={match.foundItem.itemName}
                          className="w-full h-40 object-cover rounded mb-3"
                        />
                        <p className="mb-2">{match.foundItem.itemName}</p>
                        <p className="text-sm text-gray-600 mb-2">{match.foundItem.description}</p>
                        <p className="text-sm text-gray-500">
                          Found by {match.foundItem.foundBy}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => onOpenChat(match)}
                      className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open Chat
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
