import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { USER_KEY, TOKEN_KEY, entrar, sair } from "../services/auth";
import { createSession } from "../services/UsuarioService";
import * as messages from "../../src/components/message/toastr";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storageUser = Cookies.get(USER_KEY);
    const storageToken = Cookies.get(TOKEN_KEY);
    if (storageToken && storageUser) {
      setUser(JSON.parse(storageUser));
      api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
    }
    setLoading(false);
  }, [status]);

  const login = async (dados) => {
    try {
      const { data } = await createSession(dados);
      const user = jwtDecode(data.accessToken);
      setUser(user.sub);
      console.log(user.sub);
      Cookies.set(TOKEN_KEY, data.accessToken);
      Cookies.set(USER_KEY, JSON.stringify(user));
      entrar(data.accessToken);
      setStatus("Login successful");
      messages.mensagemSucesso("Login com sucesso!");
      navigate("/");
    } catch (error) {
      messages.mensagemErro("Ocorreu um erro interno. Tente novamente!");
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      sair();
      setUser(null);
      setStatus("");
      navigate("/")
    } catch (error) {
      messages.mensagemErro(error.message);
    }
  };

  // if (loading) return <Loading />;
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

