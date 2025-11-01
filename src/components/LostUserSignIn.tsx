import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Shield, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { toast } from 'sonner';

interface LostUserSignInProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function LostUserSignIn({ onSuccess, onBack }: LostUserSignInProps) {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateEmail = (email: string) => {
    return email.endsWith('@nirmauni.ac.in');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (validateEmail(value)) {
      setShowOtp(true);
    } else {
      setShowOtp(false);
      setOtpSent(false);
    }
  };

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      toast.error('Please use your institutional email address (@nirmauni.ac.in)');
      return;
    }
    
    // Simulate OTP sending
    setOtpSent(true);
    toast.success('OTP sent to your email!');
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    // Simulate OTP verification (in production, verify with backend)
    if (otp === '123456' || otp.length === 6) {
      setIsVerified(true);
      toast.success('Email verified successfully!');
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F0FF] to-blue-50 py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 md:p-10 bg-white/90 backdrop-blur-sm shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Lost Item Portal - Sign In
            </h2>
            <p className="text-gray-600">
              Sign in with your institutional email
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@nirmauni.ac.in"
                value={email}
                onChange={handleEmailChange}
                className="mt-2"
              />
              {email && !validateEmail(email) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-amber-600 mt-2 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Please use your institutional email address
                </motion.p>
              )}
            </motion.div>

            <AnimatePresence>
              {showOtp && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="border-t border-gray-200 pt-6">
                    <Label htmlFor="otp" className="mb-3 block">
                      Enter 6-Digit OTP
                    </Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSendOtp}
                      disabled={otpSent || isVerified}
                      variant="outline"
                      className="flex-1"
                    >
                      {otpSent ? 'OTP Sent' : 'Send OTP'}
                    </Button>
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={!otpSent || otp.length !== 6 || isVerified}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      Verify OTP
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-600 p-4 bg-green-50 rounded-lg"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Email verified successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
