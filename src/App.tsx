import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext'; // Importa el TaskProvider
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Home } from './pages/Home';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider> {/* Envuelve con TaskProvider */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;