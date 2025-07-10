import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/img/about/Logotipo.jpg";
import { Link } from "react-router-dom";
import { getComentarioNoticiaId } from "../../services/ComentarioService";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../contexts/auth";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Resposta from "../resposta/Resposta";
import Acesso from "../../components/acesso/Acesso";
import Comentario from "../comentario/Comentario";

const ModalGCR = ({ slug }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const logado = user?.id;
  //SALVAR E LISTAR COMENTARIO
  const [comentarios, setComentarios] = useState([]);
  const [idComentario, setIdComentario] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openAComent, setOpenComent] = React.useState(false);
  const [openAcesso, setOpenAcesso] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdComentario(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const handleClickOpenComent = () => {
    setOpenComent(true);
  };
  //
  const handleCloseComent = () => {
    setOpenComent(false);
  };
  //
  //
  const handleClickOpenAcesso = () => {
    setOpenAcesso(true);
  };
  //
  const handleCloseAcesso = () => {
    setOpenAcesso(false);
  };
  //
  useEffect(() => {
    getAllComentarios();
  }, [slug]);
  //
  const getAllComentarios = () => {
    if (slug) {
      getComentarioNoticiaId(slug)
        .then((response) => {
          if (response && response.data) {
            // Verifica se response e response.data existem
            setComentarios(response.data);

            const result = response.data[0].id;
            setIdComentario(result);
            // console.log(result, "IDDDDDDDDDDDDDDDDDDDDDD");

            // console.log(response.data, "Dados Comemtarios ver noticia");
          } else {
            // Lidar com o caso em que response ou response.data é indefinido
            console.error("Erro: Response ou response.data é indefinido.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar comentários:", error);
        });
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
    <div className="comments-area bgCategoriaNoticia">
      <div className="row">
        <span className="pull-right text-muted">
          <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>{" "}
          {comentarios.length} Comentários{" "}
        </span>
        <div className="col-md-12">
          {comentarios.map((com) => (
            <ul className="timeline" key={com.id}>
              <li>
                <div className="timeline-time">
                  <span className="date">{`${new Date(
                    com.createdAt
                  ).getDate()} de 
                                    ${
                                      meses[new Date(com.createdAt).getMonth()]
                                    } `}</span>
                  <span className="time">{`${new Date(com.createdAt)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${new Date(com.createdAt)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`}</span>
                </div>
                <div className="timeline-icon">
                  <a href="#">&nbsp;</a>
                </div>
                <div className="timeline-body">
                  <div className="timeline-header">
                    <span className="userimage">
                      {" "}
                      <img src={img} width="50" alt="" />
                    </span>
                    <span className="username">
                      <a href="#">{com.user.nome}</a> <small></small>
                    </span>
                  </div>
                  <div className="timeline-content">
                    {/* <p style={{ fontSize: '16px', lineHeight: '1.5', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: com.descricao }}></p> */}
                    <p
                      style={{ lineHeight: "1.5", wordBreak: "break-word" }}
                      dangerouslySetInnerHTML={{ __html: com.descricao }}
                    ></p>
                  </div>
                  {/*  */}
                  <div className="timeline-footer">
                    <Link to="" className="m-r-15 text-inverse-lighter">
                      <i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i>{" "}
                      Curtir
                    </Link>
                    <Link to="" className="m-r-15 text-inverse-lighter">
                      <i
                        className="fa fa-thumbs-up fa-fw fa-lg m-r-3"
                        onClick={handleClickOpenComent}
                      ></i>{" "}
                      Comentar
                    </Link>
                    {isAuthenticated ? (
                      <Link
                        to=""
                        onClick={() => handleClickOpen(com.id)}
                        className="m-r-15 text-inverse-lighter"
                      >
                        <i className="fa fa-share fa-fw fa-lg m-r-3 linkResposta"></i>
                        Responder
                      </Link>
                    ) : (
                      <Link
                        to=""
                        className="m-r-15 text-inverse-lighter"
                        onClick={handleClickOpenAcesso}
                      >
                        <i className="fa fa-share fa-fw fa-lg m-r-3"></i>
                        Responder
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <Dialog
        open={openAComent}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <Comentario />
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleCloseComent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <Resposta idComentario={idComentario} />
        </DialogContent>
      </Dialog>

      {/*  */}
      <Dialog
        open={openAcesso}
        onClose={handleCloseAcesso}
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
//
export default ModalGCR;
