import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/layouts/Header'
import img from "../../assets/img/about/Logotipo.jpg"
import { AuthContext } from '../../contexts/auth';
import { Link, useParams } from 'react-router-dom';
import { getNoticiaRelacionados, getNoticiaSlug } from '../../services/BlogService';
import Comentario from '../comentario/Comentario';
import Subescrever from '../subescrever/Subescrever';
import * as messages from "../../components/message/toastr";
import { getCategorias } from '../../services/CategoriaService';
import { getPerfilUserIdRelacionados } from '../../services/UsuarioService';

const ViewBlog = () => {
  // 
  const { isAuthenticated, user } = useContext(AuthContext);
  const logado = user?.id;
  const [idNoticia, setIdNoticia] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [noticiaRelacionados, setNoticiaRelacionados] = useState([]);
  const [noticiaPerfilRelacionados, setNoticiaPerfilRelacionados] = useState({});
  const [userId, setUserId] = useState([]);

  //
  const { slug } = useParams();
  //
  const [blog, setBlog] = useState({
    imgURL: "",
    titulo: "",
    descricao: "",
    createdAt: ""
  });
  //
  useEffect(() => {
    viewBlog();
    getAllCategorias();
    getAllNoticiaRelacionado();
    getAllNoticiaPerfilRelacionado();
  }, [slug, userId]);
  //
  const viewBlog = () => {
    if (slug) {
      getNoticiaSlug(slug).then((response) => {
        setBlog(response.data);
        const result = response.data.id;
        setIdNoticia(result);
        // console.log(result, "NOTOCIAS BLOG");
        // 
        const resultUser = response.data.user?.id
        setUserId(resultUser)
        // console.log(resultUser, "DAAAAAAAAAAAAAA Usuario Id")

      });
    }
  };
  //
  const getAllCategorias = async () => {
    await getCategorias()
      .then((response) => {
        setCategorias(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // messages.mensagemErro(error, "Kama");
        console.log(error, "Kama");
      });
  };
  //
  const getAllNoticiaRelacionado = async () => {
    try {
      const response = await getNoticiaRelacionados(userId);
      setNoticiaRelacionados(response.data);
      console.log("NOTICIA Perfil Relacionados:", response.data);

    } catch (error) {
      console.error("Erro ao obter notícias relacionadas:", error);
    }
  };


  const getAllNoticiaPerfilRelacionado = async () => {
    try {
      const response = await getPerfilUserIdRelacionados(userId);
      setNoticiaPerfilRelacionados(response.data);

      console.log("Noticia Perfil Relacionados:", response.data);

    } catch (error) {
      console.error("Erro ao obter notícias relacionadas:", error);
    }
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
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="blog_area single-post-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post row bgCategoriaNoticia">
                <div className="col-lg-12">
                  <div className="feature-img">
                    <img className="img-fluid" src={`${blog.imgURL}`} alt={blog.imgURL} />
                  </div>
                </div>
                <div className="col-lg-12 col-md-9 blog_details">
                  <h2>{blog.titulo}</h2>
                  <p className="excert">Publicado em &nbsp;
                    {new Date(blog.createdAt).getDate() === new Date().getDate() &&
                      new Date(blog.createdAt).getMonth() === new Date().getMonth() &&
                      new Date(blog.createdAt).getFullYear() ===
                      new Date().getFullYear() ? (
                      <>
                        Hoje às {new Date(blog.createdAt).getHours()}:
                        {new Date(blog.createdAt).getMinutes()} (
                        {new Date(new Date() - new Date(blog.createdAt)).getHours() - 1 >
                          0 ? (
                          <>
                            {new Date(new Date() - new Date(blog.createdAt)).getHours() -
                              1}
                            h
                          </>
                        ) : (
                          ""
                        )}{" "}
                        {new Date(new Date() - new Date(blog.createdAt)).getMinutes()} min
                        atrás )
                      </>
                    ) : (
                      <>
                        {new Date(blog.createdAt).getDate()} de {" "}
                        {meses[new Date(blog.createdAt).getMonth()]} de{" "}
                        {new Date(blog.createdAt).getFullYear()} às{" "}
                        {new Date(blog.createdAt).getHours()}:
                        {new Date(blog.createdAt).getMinutes()}
                      </>
                    )}

                  </p>
                  <p style={{ wordBreak: 'break-word' }} className="excert" dangerouslySetInnerHTML={{__html: blog.descricao}}>
                  </p>
                </div>

              </div>
              {/*  */}
              {/* <Comentario /> */}
              <Comentario slug={idNoticia} />
              {/*  */}
            </div>
            {/*  */}
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget author_widget">
                  <img className="author_img" src={`${noticiaPerfilRelacionados.imgURL}`} alt="" width='100' />
                  <h4>{blog.user?.nome}</h4>
                  <p>{noticiaPerfilRelacionados.ocupacao}</p>
                  {/* <div className="social_icon">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-github"></i></a>
                  </div> */}
                  <p>{noticiaPerfilRelacionados.sobre}</p>
                  <div className="br"></div>
                </aside>
                <aside className="single_sidebar_widget popular_post_widget">
                  <h3 className="widget_title">Noticia relacionado</h3>
                  {noticiaRelacionados.map((rela) => (
                    <div className="media post_item" key={rela.id}>
                      <img src={`${rela.imgURL}`} width='50' alt="post" />
                      <div className="media-body">
                        <a href="blog-details.html"><h3>{rela.titulo}</h3></a>
                        <p>      {new Date(rela.createdAt).getDate() === new Date().getDate() &&
                          new Date(rela.createdAt).getMonth() === new Date().getMonth() &&
                          new Date(rela.createdAt).getFullYear() ===
                          new Date().getFullYear() ? (
                          <>
                            Hoje às {new Date(rela.createdAt).getHours()}:
                            {new Date(rela.createdAt).getMinutes()} (
                            {new Date(new Date() - new Date(rela.createdAt)).getHours() - 1 >
                              0 ? (
                              <>
                                {new Date(new Date() - new Date(rela.createdAt)).getHours() -
                                  1}
                                h
                              </>
                            ) : (
                              ""
                            )}{" "}
                            {new Date(new Date() - new Date(rela.createdAt)).getMinutes()} min
                            atrás )
                          </>
                        ) : (
                          <>
                            {new Date(rela.createdAt).getDate()} de {" "}
                            {meses[new Date(rela.createdAt).getMonth()]} de{" "}
                            {new Date(rela.createdAt).getFullYear()} às{" "}
                            {new Date(rela.createdAt).getHours()}:
                            {new Date(rela.createdAt).getMinutes()}
                          </>
                        )}</p>
                      </div>
                    </div>
                  ))}





                  <div className="br"></div>
                </aside>
                <aside className="single_sidebar_widget post_category_widget">
                  <h4 className="widget_title">Categorias</h4>
                  {categorias.map((cat) => (
                    <ul className="list cat-list" key={cat.id}>
                      <li>
                        <Link to={`/categoriaNoticia/${cat.id}`} className="d-flex justify-content-between">
                          {cat.amountNoticias === 0 || cat.descricao === 0 ? "" : <><p>{cat.descricao}</p>
                            <p>{cat.amountNoticias}</p></>}
                        </Link>
                      </li>
                    </ul>
                  ))}
                  {/* <div className="br"></div> */}
                </aside>
                <aside className="single-sidebar-widget newsletter_widget">
                  <Subescrever />
                  <div className="br"></div>
                </aside>
                {/* <aside className="single-sidebar-widget tag_cloud_widget">
                  <h4 className="widget_title">Tag Clouds</h4>
                  <ul className="list">
                    <li><a href="#">Technology</a></li>
                    <li><a href="#">Fashion</a></li>
                    <li><a href="#">Architecture</a></li>
                    <li><a href="#">Fashion</a></li>
                    <li><a href="#">Food</a></li>
                    <li><a href="#">Technology</a></li>
                    <li><a href="#">Lifestyle</a></li>
                    <li><a href="#">Art</a></li>
                    <li><a href="#">Adventure</a></li>
                    <li><a href="#">Food</a></li>
                    <li><a href="#">Lifestyle</a></li>
                    <li><a href="#">Adventure</a></li>
                  </ul>
                </aside> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- MODAL --> */}


    </div>
  )
}

export default ViewBlog