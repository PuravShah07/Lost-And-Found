import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { FoundItem } from '../App';

interface FoundItemFormProps {
  onSubmit: (item: Omit<FoundItem, 'id'>) => void;
  onBack: () => void;
}

export default function FoundItemForm({ onSubmit, onBack }: FoundItemFormProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    time: '',
    foundBy: ''
  });
  const [imageFile, setImageFile] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!imageFile) newErrors.push('Image is required');
    if (!formData.itemName) newErrors.push('Item name is required');
    if (!formData.description) newErrors.push('Description is required');
    if (!formData.location) newErrors.push('Location is required');
    if (!formData.date) newErrors.push('Date is required');
    if (!formData.time) newErrors.push('Time is required');
    if (!formData.foundBy) newErrors.push('Your name is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      image: imageFile
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
        setErrors(errors.filter(err => err !== 'Image is required'));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-teal-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 md:p-12 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-teal-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-center mb-2 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              Report a Found Item
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Help someone by reporting what you found
            </p>
          </motion.div>

          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-800 mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-red-700 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="image">Item Image *</Label>
              <div className="mt-2 border-2 border-dashed border-teal-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors bg-teal-50/30">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                <label htmlFor="image" className="cursor-pointer">
                  {imageFile ? (
                    <img src={imageFile} alt="Preview" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-teal-500 mb-3" />
                      <span className="text-gray-700">Click to upload image of the item</span>
                      <span className="text-sm text-gray-500 mt-1">Required</span>
                    </div>
                  )}
                </label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                required
                placeholder="e.g., Black Wallet"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                className="mt-2"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                placeholder="Describe the item in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-32"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Label htmlFor="foundBy">Your Name *</Label>
              <Input
                id="foundBy"
                required
                placeholder="Your name"
                value={formData.foundBy}
                onChange={(e) => setFormData({ ...formData, foundBy: e.target.value })}
                className="mt-2"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                required
                placeholder="Where did you find it?"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-2"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-2"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Found Item
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
