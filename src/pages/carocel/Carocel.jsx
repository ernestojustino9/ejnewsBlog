import React, { useEffect, useState } from "react";
import bg from "../../assets/img/bg/bg.png";
import * as messages from "../../components/message/toastr";
import Carousel from "react-bootstrap/Carousel";
import { getNoticias } from "../../services/BlogService";

//
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
//

const Carocel = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    getAllNoticias();
  }, []);

  //   //LISTAR
  const getAllNoticias = () => {
    getNoticias()
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        messages.mensagemErro(error);
      });
  };
  //
  return (
    <div>
      <section id="welcome-hero" className="welcome-hero">
        <div className="container-fluid">
          <Carousel>
            {noticias.map((noticia) => (
              <Carousel.Item interval={1000} className="carousel-item">
                <img src={bg} alt="First slide" className="banner-image " />
                <Carousel.Caption>
                  <h3>{noticia.titulo}</h3>
                  <p className="excert">
                    Publicado em &nbsp;
                    {new Date(noticia.createdAt).getDate() ===
                      new Date().getDate() &&
                    new Date(noticia.createdAt).getMonth() ===
                      new Date().getMonth() &&
                    new Date(noticia.createdAt).getFullYear() ===
                      new Date().getFullYear() ? (
                      <>
                        Hoje às {new Date(noticia.createdAt).getHours()}:
                        {new Date(noticia.createdAt).getMinutes()} (
                        {new Date(
                          new Date() - new Date(noticia.createdAt)
                        ).getHours() -
                          1 >
                        0 ? (
                          <>
                            {new Date(
                              new Date() - new Date(noticia.createdAt)
                            ).getHours() - 1}
                            h
                          </>
                        ) : (
                          ""
                        )}{" "}
                        {new Date(
                          new Date() - new Date(noticia.createdAt)
                        ).getMinutes()}{" "}
                        min atrás )
                      </>
                    ) : (
                      <>
                        {new Date(noticia.createdAt).getDate()} de{" "}
                        {meses[new Date(noticia.createdAt).getMonth()]} de{" "}
                        {new Date(noticia.createdAt).getFullYear()} às{" "}
                        {new Date(noticia.createdAt).getHours()}:
                        {new Date(noticia.createdAt).getMinutes()}
                      </>
                    )}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* <section id="welcome-hero" className="welcome-hero">
        <div className="container-fluid">
          <Carousel>
            <Carousel.Item interval={1000} className="carousel-item">
              <img src={bg} alt="First slide" className="banner-image " />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section> */}
    </div>
  );
};

export default Carocel;
