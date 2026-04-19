import { createContext, useContext, useState, useCallback } from 'react';
import { defaultData } from '../data/portfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'faisal_portfolio_data';
const ADMIN_PASSWORD = 'r!tu*'; // Change this!

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(loadData);
  const [adminMode, setAdminMode] = useState(false);

  const saveData = useCallback((newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const updateSection = useCallback((section, value) => {
    setData(prev => {
      const updated = { ...prev, [section]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateNested = useCallback((section, field, value) => {
    setData(prev => {
      const updated = { ...prev, [section]: { ...prev[section], [field]: value } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  }, []);

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setAdminMode(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setAdminMode(false), []);

  return (
    <PortfolioContext.Provider value={{
      data, adminMode, saveData, updateSection, updateNested, resetData, login, logout
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
