import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'freelancer' | 'client';

interface UserRoleContextData {
  role: UserRole;
  setRole: (role: UserRole) => void;
  primaryColor: string;
  primaryColorDark: string;
  gradientFrom: string;
  gradientTo: string;
}

const UserRoleContext = createContext<UserRoleContextData>({} as UserRoleContextData);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('freelancer');

  useEffect(() => {
    // Load role from localStorage
    const savedRole = localStorage.getItem('nomadhub-user-role');
    if (savedRole === 'client' || savedRole === 'freelancer') {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('nomadhub-user-role', newRole);
  };

  // Theme colors based on role
  const colors = role === 'freelancer' 
    ? {
        primaryColor: 'bg-blue-600',
        primaryColorDark: 'dark:bg-blue-600',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-purple-600',
      }
    : {
        primaryColor: 'bg-green-600',
        primaryColorDark: 'dark:bg-green-600',
        gradientFrom: 'from-green-600',
        gradientTo: 'to-emerald-600',
      };

  return (
    <UserRoleContext.Provider value={{ role, setRole, ...colors }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within UserRoleProvider');
  }
  return context;
}
