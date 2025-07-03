import React from "react";

const Footer = () => {
  const data = new Date();
  const ano = data.getFullYear();
  return (
    <div>
      <br />
      <br />
      <footer id="footer-copyright" className="footer-copyright" style={{ background: "#01153e", color: "#fff" }}>
        <div className="container">
          <div className="hm-footer-copyright text-center">
            <p>
              Todos os direitos reservados &copy; {ano} Desenvolvido por EJ-Developer
            </p>
          </div>
        </div>

        <div id="scroll-Top">
          <div className="return-to-top">
            <i className="fa fa-angle-up " id="scroll-top"></i>
          </div>

        </div>

      </footer>
      {/* <!--/Footer--> */}
    </div>
  );
};

export default Footer;
