import React, { useEffect, useState } from 'react'
import { getProjectos } from '../../services/ProjectoService';
import { Link } from 'react-router-dom';

const Projecto = () => {
  const [projecto, setProjecto] = useState([]);

  useEffect(() => {
    getAllProjectos();
  }, []);

  //   //LISTAR
  const getAllProjectos = () => {
    getProjectos()
      .then((response) => {
        setProjecto(response.data.data);
      })
      .catch((error) => {
        messages.mensagemErro(error);
      });
  };
  //   //
  return (
    <div>
      {/* <!-- Courses Start --> */}
      {projecto.length === "" ?

        ""

        :
        <section className="features_area" id='projecto'>
          <div className="section-heading text-center">
            <h2>Projectos</h2>
          </div>
          <div className="container">
            <div className="row">
              {projecto.map((proj) => (

                  <div className="col-lg-4" key={proj.id}>
                    <div className="card ">
                      <img src={`${proj.imgURL}`} className="card-img-top" alt="Image" />
                      <div className="card-body">

                        <h5 className="card-title">{proj.titulo}</h5>
                        <p dangerouslySetInnerHTML={{ __html: proj.descricao.substring(0, 100) }}></p>
                        <p className="mt-5 mb-0" style={{ textAlign: "center" }}>
                          {proj.linkGit === "" ?
                            <a href={proj.linkGit}> <span className='lerMais'>  GitHu</span></a>
                            :
                            <a href={proj.linkSite} target="_blank"> <span className='lerMais'>   Site</span></a>
                          }

                        </p>
                      </div>
                    </div>
                  </div>

              ))}

            </div>
          </div>
        </section>
      }

      {/* <!-- Courses End --> */}
    </div>
  )
}

export default Projecto
