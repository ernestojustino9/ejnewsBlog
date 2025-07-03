import React, { useEffect, useState } from "react";
import img from "../../assets/img/about/Logotipo.jpg"
import * as messages from "../../components/message/toastr";
import { getSobres } from "../../services/SobreService";

const About = () => {
    const [sobre, setSobre] = useState([]);

    useEffect(() => {
        getAllSobres();
    }, []);

    //   //LISTAR
    const getAllSobres = () => {
        getSobres()
            .then((response) => {
                setSobre(response.data.data);
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };
    //   
    return (
        <div>
            {/* <!--about start --> */}
            {sobre.length === "" ?
                ""
                :
                <section id="about" className="about">
                    <div className="section-heading text-center">
                        <h2>Sobre</h2>
                    </div>

                    <div className="container">
                        <div className="about-content">
                            {sobre.map((about) => (
                                <div className="row" key={about.id}>

                                    <div className="col-sm-6">
                                        <div className="single-about-txt">
                                            <p>
                                                {about.descricao}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-offset-1 col-sm-5">
                                        <div className="single-about-img">
                                            <img src={`${about.imgURL}`} alt="profile_image" />
                                            <div className="about-list-icon">
                                                <ul>
                                                    <li>
                                                        <a href="https://web.facebook.com/ejdeveloper" target="_blank">
                                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://github.com/ernestojustino9" target="_blank">
                                                            <i className="fa fa-github" aria-hidden="true"></i>
                                                        </a>

                                                    </li>


                                                </ul>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>

                </section>

            }
        </div>
    );
};

export default About;
