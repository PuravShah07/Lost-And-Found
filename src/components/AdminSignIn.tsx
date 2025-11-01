import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, Key } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface AdminSignInProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function AdminSignIn({ onSuccess, onBack }: AdminSignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credentials
    if (email === 'lostfound@lostfound.com' && password === 'admin@lostfound') {
      setIsLoading(true);
      
      setTimeout(() => {
        toast.success('Access granted! Welcome Admin.');
        setTimeout(() => {
          onSuccess();
        }, 500);
      }, 1000);
    } else {
      toast.error('Access Denied', {
        description: 'Invalid email or password. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-indigo-50 py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-indigo-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 md:p-10 bg-white shadow-2xl border-t-4 border-indigo-500">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={isLoading ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="mb-2 bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              Admin Login Panel
            </h2>
            <p className="text-gray-600">
              Secure access for administrators only
            </p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="lostfound@lostfound.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In as Admin
                  </>
                )}
              </Button>
            </motion.div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Demo credentials for testing:<br />
                Email: <span className="text-indigo-600">lostfound@lostfound.com</span><br />
                Password: <span className="text-indigo-600">admin@lostfound</span>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
