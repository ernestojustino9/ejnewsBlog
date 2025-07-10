import React, { useContext, useEffect, useState } from "react";
import * as messages from "../../components/message/toastr";
import img from "../../assets/img/about/Logotipo.jpg";
import { Link, useParams } from "react-router-dom";
import {
  createComentario,
  getComentarioNoticiaId,
} from "../../services/ComentarioService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../contexts/auth";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Resposta from "../resposta/Resposta";
import Acesso from "../../components/acesso/Acesso";
import { getRespostaComentarioId } from "../../services/RespostaService";

const Comentario = ({ slug }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const logado = user?.id;
  //SALVAR E LISTAR COMENTARIO
  const [comentarios, setComentarios] = useState([]);
  const [idComentario, setIdComentario] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [comentario, setComentario] = useState({
    noticiaId: { slug },
    descricao: "",
  });
  //
  const [descricao, setDescricao] = useState("");
  //
  const onInputChange = (e) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };
  //Limpar Campos
  const handleClear = () => {
    setDescricao({
      descricao: "",
    });
  };
  //Botao Salvar
  const saveComentario = async (e) => {
    e.preventDefault();

    const comentario = {
      noticiaId: slug,
      descricao,
    };
    //
    await createComentario(comentario)
      .then((response) => {
        messages.mensagemSucesso("Salvocom sucesso", response.data);
        handleClear();
        getAllComentarios();
      })
      .catch((error) => {
        messages.mensagemErro("Erro ao salvar", error);
      });
  };
  //
  const modules = { toolbar: { container } };
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
                  {/*  */}
                  <div className="timeline-comment-box">
                    <div className="user">
                      <img src={img} width="50" alt="" />
                    </div>
                    <div className="input">
                      <form onSubmit={saveComentario}>
                        <div className="form-group">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            className="custom-quill"
                            name="descricao"
                            value={descricao}
                            onChange={setDescricao}
                            style={{ maxHeight: "300px" }} // Defina a altura máxima conforme necessário
                          />
                        </div>
                        {/*  */}
                        <div style={{ marginTop: "40px" }}>
                          {isAuthenticated ? (
                            <button
                              type="submit"
                              className="primary-btn primary_btn"
                            >
                              <span>Comentar</span>
                            </button>
                          ) : (
                            <di>
                              Você precisa fazer o <a href="#">login</a> para
                              publicar um comentário...
                            </di>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
//
let container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  // ["blockquote", "code-block"],

  // [{ header: 1 }, { header: 2 }], // custom button values
  // [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

//
export default Comentario;
