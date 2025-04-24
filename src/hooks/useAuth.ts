import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (email: string, password: string) => {
    try {
      await authService.register(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Error en el registro");
    }
  };

  return { register, error };
};