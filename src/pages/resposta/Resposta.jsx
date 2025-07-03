import React, { useContext, useEffect, useState } from 'react'
import img from "../../assets/img/about/Logotipo.jpg"
import * as messages from "../../components/message/toastr";
import { AuthContext } from '../../contexts/auth';
import { createRespostas, getRespostaComentarioId } from '../../services/RespostaService';
import { getComentarioId } from '../../services/ComentarioService';

const Resposta = ({ idComentario }) => {
  // 
  const { isAuthenticated, user } = useContext(AuthContext);
  const logado = user?.id;
  //
  const [comentario, setComerntario] = useState({
    noticiaId: "",
    descricao: "",
  });
  //
  useEffect(() => {
    viewComerntario();
    getAllRespostas();
  }, [idComentario]);
  //
  const viewComerntario = () => {
    if (idComentario) {
      getComentarioId(idComentario).then((response) => {
        setComerntario(response.data);
        console.log(response.data, "Dados getview Comerntarios VEJA BEM");
      });
    }
  };
  // 
  //SALVAR E LISTAR COMENTARIO 
  const [respostas, setRespostas] = useState([]);
  const getAllRespostas = () => {
    if (idComentario) {
      getRespostaComentarioId(idComentario).then((response) => {
        setRespostas(response.data);
        console.log(response.data, "Dados resposta ver");
      });
    }
  };



  const [resposta, setResposta] = useState({
    comentarioId: idComentario,
    descricao: "",
  });

  const { comentarioId, descricao } = resposta;
  //
  const onInputChange = (e) => {
    setResposta({ ...resposta, [e.target.name]: e.target.value });
  };

  //Limpar Campos
  const handleClear = () => {
    setResposta({
      descricao: "",
    });
  };
  //Botao Salvar
  const saveResposta = async (e) => {
    e.preventDefault();

    const resposta = {
      comentarioId,
      descricao
    };
    //
    await createRespostas(resposta)
      .then((response) => {
        messages.mensagemSucesso("Salvocom sucesso", response.data);
        handleClear();
        getAllRespostas();
      })
      .catch((error) => {
        messages.mensagemErro("Erro ao salvar", error);
      });
  }
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
      <section className="blog_area single-post-area section_gap" >
        <div className="container" >
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-lg-12 posts-list">


              <div className="comments-area">
                <div className="comment-list">
                  <div className="single-comment justify-content-between d-flex">
                    <div className="user justify-content-between d-flex">
                      <div className="thumb">
                        <img src={img} alt="imgComentario" width='50' />
                      </div>
                      <div className="desc commenterList">
                        <h5><a href="#">{comentario.user?.nome}</a></h5>
                        <p className="date">      {new Date(comentario.createdAt).getDate() === new Date().getDate() &&
                          new Date(comentario.createdAt).getMonth() === new Date().getMonth() &&
                          new Date(comentario.createdAt).getFullYear() ===
                          new Date().getFullYear() ? (
                          <>
                            Hoje às {new Date(comentario.createdAt).getHours()}:
                            {new Date(comentario.createdAt).getMinutes()} (
                            {new Date(new Date() - new Date(comentario.createdAt)).getHours() - 1 >
                              0 ? (
                              <>
                                {new Date(new Date() - new Date(comentario.createdAt)).getHours() -
                                  1}
                                h
                              </>
                            ) : (
                              ""
                            )}{" "}
                            {new Date(new Date() - new Date(comentario.createdAt)).getMinutes()} min
                            atrás )
                          </>
                        ) : (
                          <>
                            {new Date(comentario.createdAt).getDate()} de {" "}
                            {meses[new Date(comentario.createdAt).getMonth()]} de{" "}
                            {new Date(comentario.createdAt).getFullYear()} às{" "}
                            {new Date(comentario.createdAt).getHours()}:
                            {new Date(comentario.createdAt).getMinutes()}
                          </>
                        )} </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.5', wordBreak: 'break-word' }} className="comment" dangerouslySetInnerHTML={{ __html: comentario.descricao }}>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {respostas.map((res) => (
                  <div className="comment-list left-padding" key={res.id}>
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb">
                          <img src={img} alt="imgResponder" width="50" />
                        </div>
                        <div className="desc commenterList">
                          <h5><a href="#">{res.user?.nome}</a></h5>
                          <p className="date"> {new Date(res.createdAt).getDate() === new Date().getDate() &&
                            new Date(res.createdAt).getMonth() === new Date().getMonth() &&
                            new Date(res.createdAt).getFullYear() ===
                            new Date().getFullYear() ? (
                            <>
                              Hoje às {new Date(res.createdAt).getHours()}:
                              {new Date(res.createdAt).getMinutes()} (
                              {new Date(new Date() - new Date(res.createdAt)).getHours() - 1 >
                                0 ? (
                                <>
                                  {new Date(new Date() - new Date(res.createdAt)).getHours() -
                                    1}
                                  h
                                </>
                              ) : (
                                ""
                              )}{" "}
                              {new Date(new Date() - new Date(res.createdAt)).getMinutes()} min
                              atrás )
                            </>
                          ) : (
                            <>
                              {new Date(res.createdAt).getDate()} de {" "}
                              {meses[new Date(res.createdAt).getMonth()]} de{" "}
                              {new Date(res.createdAt).getFullYear()} às{" "}
                              {new Date(res.createdAt).getHours()}:
                              {new Date(res.createdAt).getMinutes()}
                            </>
                          )} </p>
                          <p style={{ fontSize: '16px', lineHeight: '1.5', wordBreak: 'break-word' }} className="comment" dangerouslySetInnerHTML={{ __html: res.descricao }}>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment-form">
                <form onSubmit={saveResposta}>
                  <div className="form-group">
                    <textarea
                      className="form-control mb-10"
                      rows="5"
                      name="descricao"
                      value={descricao}
                      onChange={(e) => onInputChange(e)}
                      placeholder="Responder"
                      onfocus="this.placeholder = ''"
                      onblur="this.placeholder = 'Responder'"

                    ></textarea>
                  </div>
                  <button type="submit" className="primary-btn primary_btn"><span>Responder</span></button>
                </form>
              </div>
            </div>


          </div>
        </div>
      </section>
    </div>
  )
}

export default Resposta