'use client'

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { registerStudentAction } from '@/app/actions/auth.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const nameSchema = z.string().min(3, "Name must be at least 3 characters");
const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

  interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  // interface RegisterResponse {
  //   success: boolean;
  //   message?: string;
  //   errors?: Record<string, string[]>;
  // }

const RegisterForm = () =>{

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    const newErrors: Record<string, string[]> = {};
    
    // Only validate fields that have been touched
    if (touched.name) {
      try {
        nameSchema.parse(formData.name);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.username = error.errors.map(e => e.message);
        }
      }
    }
    
    if (touched.email) {
      try {
        emailSchema.parse(formData.email);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.email = error.errors.map(e => e.message);
        }
      }
    }
    
    if (touched.password) {
      try {
        passwordSchema.parse(formData.password);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.password = error.errors.map(e => e.message);
        }
      }
    }
    
    if (touched.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ["Passwords do not match"];
    }
    
    setFormErrors(newErrors);
  }, [formData, touched]);

  const registerMutation = useMutation({
    mutationFn: registerStudentAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Student registered successfully');
        // Reset form after successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setFormErrors({});
        queryClient.invalidateQueries({ queryKey: ['students'] });
      } else {
        setFormErrors(result.errors || {});
        toast.error(result.message || "Registration failed");
      }
    },
    onError: (error) => {
      console.error('Registration error:', error);
      toast.error('Failed to register student. Please try again.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    const nameResult = nameSchema.safeParse(formData.name);
    const emailResult = emailSchema.safeParse(formData.email);
    const passwordResult = passwordSchema.safeParse(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    if (!nameResult.success || !emailResult.success || !passwordResult.success || !passwordsMatch) {
      // Don't submit if there are validation errors
      return;
    }
    registerMutation.mutate(formData);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <Card className="w-full bg-[#1E1E1E] border-[#8D6CCB]/20">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Register New Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input 
                id="name" 
                placeholder="Full Name"
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onBlur={() => handleBlur('name')}
                disabled={registerMutation.isPending}
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">{formErrors.username[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="student@example.com"
                className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onBlur={() => handleBlur('email')}
                disabled={registerMutation.isPending}
              />
               {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onBlur={() => handleBlur('password')}
                  disabled={registerMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gradient"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[#3B444B]/50 border-[#6544A3] text-white placeholder:text-gray-400 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onBlur={() => handleBlur('confirmPassword')}
                  disabled={registerMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gradient"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword[0]}</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#8D6CCB] to-[#9000FF] hover:from-[#9000FF] hover:to-[#8D6CCB] text-white font-medium active:scale-102"
            disabled={registerMutation.isPending || Object.keys(formErrors).length > 0}
          >
            {registerMutation.isPending ? 'Registering...' : 'Register Student'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
