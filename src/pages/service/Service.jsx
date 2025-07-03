import React, { useEffect, useState } from "react";
import * as messages from "../../components/message/toastr";
import { getServicos } from "../../services/ServicoService";

const Service = () => {
    const [servico, setServico] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllServicos();
    }, []);

    //   //LISTAR
    const getAllServicos = () => {
        getServicos()
            .then((response) => {
                setServico(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };
    //   //
    return (
        <div>
            {servico.length === "" ?
                "" :
                <section className="features_area" id='service'>
                    <div className="section-heading text-center">
                        <h2>Serviço</h2>
                    </div>

                    <div className="container">

                        <div className="row feature_inner">
                            {servico.map((servic) => (
                                <div className="col-lg-3 col-md-6" key={servic.id}>
                                    <div className="feature_item">
                                        <img src={`${servic.imgURL}`} alt="" />
                                        <h4>{servic.titulo}</h4>
                                        <p style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: servic.descricao }}></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            }

        </div>
    )
}

export default Service