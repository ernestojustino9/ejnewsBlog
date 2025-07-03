import React, { useEffect, useState } from 'react'
import * as messages from "../../components/message/toastr";
import { getNoticiaRecentes } from '../../services/BlogService'
import { Link } from 'react-router-dom';


const BlogRecente = () => {
  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    getAllNoticias();
  }, []);

  //LISTAR
  const getAllNoticias = async () => {
    await getNoticiaRecentes()
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        messages.mensagemErro(error);
      });
  };
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
  return (
    <div>
      {/* <!-- Courses Start --> */}
      {noticias.length === "" ? "" : <section className="features_area" id='postRecents'>
        <div className="section-heading text-center">
          <h2>Posts recentes</h2>
        </div>
        {/* <br />
      <br />
      <br />
      <br /> */}
        <div className="container">
          <div className="row">
            {noticias.map((not) => (
              <div className="col-lg-4" key={not.id}>
                <div className="card post-entry">
                  <img src={`${not.imgURL}`} className="card-img-top" alt="Image" />
                  <div className="card-body">
                    <div><span className="font-weight-bold date">{`${new Date(
                      not.createdAt
                    ).getDate()} de ${meses[
                    new Date(
                      not.createdAt
                    ).getMonth()
                    ]
                      } de ${new Date(
                        not.createdAt
                      ).getFullYear()}`}</span></div>
                    <h5 className="card-title">{not.titulo}</h5>
                    {/* <p>{not.descricao.substring(0, 100)}... </p> */}
                    <p dangerouslySetInnerHTML={{ __html: not.descricao.substring(0, 100) }}>
                    </p>
                    <p className="mt-5 mb-0">
                      <Link to={`/viewBlog/${not.slug}`}> <span className='lerMais'>   Ler Mais ...</span></Link>
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

export default BlogRecente