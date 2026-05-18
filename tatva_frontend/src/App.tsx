import './index.css';
import { useState } from 'react';
import { ChatPage } from './pages/ChatPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { tokenStorage } from './services/authApi';

type AuthView = 'login' | 'signup';

function App() {
  const [token, setToken] = useState(() => tokenStorage.get());
  const [userName, setUserName] = useState('');
  const [view, setView] = useState<AuthView>('login');

  const handleLogin = (name: string) => {
    setUserName(name);
    setToken(tokenStorage.get());
  };

  const handleLogout = () => {
    tokenStorage.clear();
    setToken(null);
    setUserName('');
  };

  if (!token) {
    return view === 'login'
      ? <LoginPage onLogin={handleLogin} onGoSignup={() => setView('signup')} />
      : <SignupPage onGoLogin={() => setView('login')} />;
  }

  return <ChatPage userName={userName} onLogout={handleLogout} />;
}

export default App;
