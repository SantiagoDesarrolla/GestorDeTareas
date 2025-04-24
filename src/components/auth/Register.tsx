import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">Registro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-yellow-600 hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};