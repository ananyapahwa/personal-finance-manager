import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { IndianRupee, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Savings from './pages/Savings';
import SplitBill from './pages/SplitBill';
import Login from './pages/Login';
import { INITIAL_TRANSACTIONS, INITIAL_SAVINGS } from './data/mockData';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main App Layout
const AppLayout = ({ children, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, darkMode, setDarkMode, onLogout, transactions, savings }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path) {
      setActiveTab(path);
    }
  }, [location, setActiveTab]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        onLogout={onLogout}
        transactions={transactions}
        savings={savings}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <IndianRupee size={20} className="text-white" />
            </div>
            <span className="font-bold">PaisaPortfolio</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [savings, setSavings] = useState(INITIAL_SAVINGS);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });
  const navigate = useNavigate();

  // Apply `.dark` class to the html element and save preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchGoals = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSavings(data);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Check if user is already logged in (from localStorage or sessionStorage)
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchGoals();
      fetchTransactions();
    }
  }, []);

  const handleLogin = (userData, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('token', userData.token);
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    setIsAuthenticated(true);
    fetchGoals();
    fetchTransactions();
    console.log('Login handler called, state updated');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setActiveTab('dashboard');
    navigate('/login');
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login
              onLogin={handleLogin}
              darkMode={darkMode}
              toggleTheme={() => setDarkMode(!darkMode)}
            />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
              transactions={transactions}
              savings={savings}
            >
              <Dashboard
                transactions={transactions}
                savings={savings}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
            >
              <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
                fetchTransactions={fetchTransactions}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/savings"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
            >
              <Savings
                savings={savings}
                setSavings={setSavings}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/split"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
            >
              <SplitBill
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      {/* 404 Redirect */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
};

export default App;
