import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Link, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import Acesso from "../acesso/Acesso";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const logado = user?.id;

  const [open, setOpen] = React.useState(false);
  const { userId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogout = async () => {
    const { value } = await Swal.fire({
      title: "Terminar a sessão",
      text: "Tem certeza que deseja terminar a sessão?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });

    if (value) {
      logout();
    }
  };

  const rota = useLocation();

  const [ativar, setAtivar] = useState("");
  useEffect(() => {
    setAtivar(rota.pathname);
  }, [rota]);
  //
  const handleShowMenu = () => {
    const nav = document.getElementById("menuHambuguer");

    if (nav) {
      nav.classList.toggle("verMenuCima");
    }
  };
  // 
  return (
    <div>
      {/* <!-- top-area Start --> */}
      <header className="top-area">
        <div className="header-area">
          {/* <!-- Start Navigation --> */}
          <nav className="navbar navbar-default bootsnav navbar-fixed dark no-background">

            <div className="container">

              {/* <!-- Start Header Navigation --> */}
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i className="fa fa-bars"></i>
                </button>
                <a className="navbar-brand" href="index.html">Ej-Developer</a>
              </div>
              {/* <!-- End Header Navigation --> */}
              <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                  <li className=" smooth-menu active"></li>
                  <li className=" smooth-menu"><Link className={` ${ativar === "/" ? "active" : ""
                    } `} to="/">Inicio</Link></li>
                  <li className="smooth-menu"><a href="#about">Sobre</a></li>
                  {/* <li className="smooth-menu"><a href="#skills">skills</a></li> */}
                  <li className="smooth-menu"><a href="#service">Serviço</a></li>
                  <li className="smooth-menu"><a href="#projecto">Projecto</a></li>
                  <li className="smooth-menu"><a href="#contact">contacto</a></li>
                  <li className="smooth-menu"><Link to="/blog">Blog</Link></li>
                  {isAuthenticated ? <li className="smooth-menu"><Link to={`/account/${user?.id}`}>Minha conta</Link></li> : ""}
                  {!user ?
                    <li className="smooth-menu"><Link
                      to=""
                      onClick={handleClickOpen}
                    >
                      <span
                        className="primary_btnLogin"
                      >Entrar</span></Link></li> :
                    <li className="smooth-menu"><a href="#" onClick={handleLogout}>
                      <span className="primary_btnLogin">Sair</span></a></li>}
                </ul>
              </div>
            </div>
          </nav>
          {/* <!-- End Navigation --> */}
          <div className="menuHambuguer" id="menuHambuguer">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 50px",
              }}
            >
              <div></div>
              <i
                onClick={handleShowMenu}
                className="fa fa-times mobile-nav-toggle"
                id="menuFechar"
              ></i>
            </div>

            <nav id="navbar2" className="navbar navbar-default bootsnav navbar-fixed dark no-background">

              <div className="container">

                {/* <!-- Start Header Navigation --> */}
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i className="fa fa-bars"></i>
                  </button>
                  <a className="navbar-brand" href="index.html">Ej-Developer</a>
                </div>
                {/* <!-- End Header Navigation --> */}
                <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                  <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                    <li className=" smooth-menu active"></li>
                    <li className=" smooth-menu"><Link className={` ${ativar === "/" ? "active" : ""
                      } `} to="/">Inicio</Link></li>
                    <li className="smooth-menu"><a href="#about">Sobre</a></li>
                    <li className="smooth-menu"><a href="#skills">skills</a></li>
                    <li className="smooth-menu"><a href="#service">Serviço</a></li>
                    <li className="smooth-menu"><a href="#contact">contacto</a></li>
                    <li className="smooth-menu"><Link to="/blog">Blog</Link></li>
                    {isAuthenticated ? <li className="smooth-menu"><Link to={`/account/${logado}`}>Minha conta</Link></li> : ""}
                    {!user ?
                      <li className="smooth-menu"><Link
                        to=""
                        onClick={handleClickOpen}
                      >
                        <span
                          className="primary_btnLogin"
                        >Entrar</span></Link></li> :
                      <li className="smooth-menu"><a href="#" onClick={handleLogout}>
                        <span className="primary_btnLogin">Sair</span></a></li>}
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/*  */}
        </div>
      </header>



      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <Acesso />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
