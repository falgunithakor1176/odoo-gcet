import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/hrms';
import { mockUsers } from '@/data/mockData';
import { generateSystemCredentials } from '@/lib/authHelpers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<{ success: boolean; credentials?: { loginId: string; tempPassword: string }; error?: string }>;
  logout: () => void;
}

interface SignupData {
  companyName: string;
  email: string;
  name: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Using local state to simulate a database
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    // Check if user exists in our local list
    const foundUser = users.find(u => 
      (u.email === identifier || u.employeeId === identifier)
    );

    // Simple password check for mock (accept any password > 6 chars)
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData) => {
    // 1. BLOCK EMPLOYEES: Only Admin/Manager can register
    if (data.role === 'employee' && !user) {
      return { 
        success: false, 
        error: "Employees cannot self-register. Please contact your HR/Admin for credentials." 
      };
    }

    // 2. GENERATE CREDENTIALS (Offline Logic)
    const { loginId, tempPassword } = generateSystemCredentials(
      data.companyName, 
      data.name, 
      users.length
    );

    const newUser: User = {
      id: String(users.length + 1),
      employeeId: loginId, // e.g. OIHR20250001
      email: data.email,
      name: data.name,
      role: data.role,
      department: 'Unassigned',
      designation: data.role === 'admin' ? 'System Admin' : 'Manager',
      phone: '',
      address: '',
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    // Save to local state
    setUsers([...users, newUser]);
    
    // Return success immediately (No Firebase call)
    return { 
      success: true, 
      credentials: { loginId, tempPassword } 
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}