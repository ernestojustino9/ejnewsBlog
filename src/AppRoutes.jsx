import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layouts/Footer";
import Blog from "./pages/blog/Blog";
import { AuthContext, AuthProvider } from "./contexts/auth";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ViewBlog from "./pages/blog/ViewBlog";
import Resposta from "./pages/resposta/Resposta";


const AppRoutes = () => {
  // Pagina Privada
  const Private = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    // if (loading) {
    //   return <div className="loading">Carregando, Aguarde...</div>;

    // }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    //Se tiver pode acessar
    return children;
  };
  //
  return (
    <Router>
      {/*  */}
      <AuthProvider>
        <Routes>
          {/* Home Pege */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/viewBlog/:id" element={<ViewBlog />} />
          <Route exact path="/resposta/:id" element={<Resposta />} />
          {/* <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} /> */}
          {/* Lista de Produtos */}
          {/* <Route exact path="/produtos" element={<Produtos />} />
          <Route exact path="/viewProduto/:id" element={<ViewProdutos />} />
          <Route exact path="/carrinho" element={<Carrinho />} /> */}

          {/* Login */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/account/:id" element={<Account />} /> */}
          {/* <Route exact path="*" element={<NotFound />} /> */}
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
