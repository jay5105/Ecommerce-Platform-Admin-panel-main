import './App.css';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import AuthWrapper from './components/AuthWrapper';
import AdminLandingPage from './components/AdminLandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<AdminLandingPage />} />
        {/* Admin Login */}
        <Route path="/login" element={<Login />} />
        {/* Protected Admin Panel */}
        <Route path="/admin/*" element={
          <AuthWrapper>
            <AdminPanel />
          </AuthWrapper>
        } />
      </Routes>
    </div>
  );
}

export default App;
