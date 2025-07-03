import React, { useState } from "react";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";

const Acesso = () => {
  const [view, setView] = useState("login");

  return (
    <div>
      {/* <!-- Pills content --> */}
      <div className="tab-content">
        <div
        //   className="tab-pane fade show active"
        //   id="pills-login"
        //   role="tabpanel"
        //   aria-labelledby="tab-login"
        >
          {/*  */}
          {view === "login" ? <Login /> : <Register />}
          {/*  */}
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            {view === "login" ?   <a
              href="#"
              className="btnLogin"
              onClick={() => setView("register")}
              style={{ color: view === "register" ? "" : "" }}
            >
              <p className="mt-5 login-form__footer">Não tem uma conta? <span className="text-primary">Cadastra-se</span></p>
            </a>:    <a
              href="#"
              className="btnLogin"
              onClick={() => setView("login")}
              style={{ color: view === "login" ? "" : "" }} 
            >
               <p className="mt-5 login-form__footer">Ja tem uma conta? <span className="text-primary">Entrar</span></p>
            </a>}
          </div>
          {/*  */}
        </div>
      </div>
      {/* <!-- Pills content --> */}
      {/*  */}
    </div>
  );
};

export default Acesso;