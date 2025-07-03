import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Footer from "../components/layouts/Footer";
import NotFound from "../components/error/NotFound";
import Blog from "../pages/blog/Blog";
import { AuthContext, AuthProvider } from "../contexts/auth";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ViewBlog from "../pages/blog/ViewBlog";
import Account from "../pages/account/Account";
import CategoriaNoticia from "../pages/categorianoticia/CategoriaNoticia";


const Routas = () => {
  // Pagina Privada
  const Private = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="center-body">
        <div className="spinner"></div>
      </div>;

    }

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
          <Route exact path="/viewBlog/:slug" element={<ViewBlog />} />
          <Route exact path="/categoriaNoticia/:categoriaId" element={<CategoriaNoticia />} />

          {/* Login */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/account/:id" element={<Account />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default Routas;
