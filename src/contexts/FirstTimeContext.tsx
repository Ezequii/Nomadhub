import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FirstTimeContextType {
  isFirstTime: boolean;
  showProModal: boolean;
  hasSeenProModal: boolean;
  markFirstTimeComplete: () => void;
  triggerProModal: () => void;
  closeProModal: () => void;
}

const FirstTimeContext = createContext<FirstTimeContextType | undefined>(undefined);

const FIRST_TIME_KEY = 'nomadhub-first-time';
const PRO_MODAL_KEY = 'nomadhub-pro-modal-seen';

export function FirstTimeProvider({ children }: { children: ReactNode }) {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [hasSeenProModal, setHasSeenProModal] = useState(false);

  useEffect(() => {
    // Check if user is first time
    const firstTime = localStorage.getItem(FIRST_TIME_KEY);
    const proModalSeen = localStorage.getItem(PRO_MODAL_KEY);
    
    setIsFirstTime(firstTime === 'true');
    setHasSeenProModal(proModalSeen === 'true');
  }, []);

  const markFirstTimeComplete = () => {
    localStorage.removeItem(FIRST_TIME_KEY);
    setIsFirstTime(false);
  };

  const triggerProModal = () => {
    if (!hasSeenProModal) {
      setShowProModal(true);
    }
  };

  const closeProModal = () => {
    setShowProModal(false);
    localStorage.setItem(PRO_MODAL_KEY, 'true');
    setHasSeenProModal(true);
  };

  return (
    <FirstTimeContext.Provider
      value={{
        isFirstTime,
        showProModal,
        hasSeenProModal,
        markFirstTimeComplete,
        triggerProModal,
        closeProModal,
      }}
    >
      {children}
    </FirstTimeContext.Provider>
  );
}

export function useFirstTime() {
  const context = useContext(FirstTimeContext);
  if (context === undefined) {
    throw new Error('useFirstTime must be used within FirstTimeProvider');
  }
  return context;
}
