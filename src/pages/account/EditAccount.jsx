import React, { useContext, useState } from 'react'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import ReactQuill from 'react-quill';
import { AuthContext } from '../../contexts/auth';
import * as messages from "../../components/message/toastr";
import { createPerfil, salvePerfil } from '../../services/UsuarioService';

const EditAccount = ({id}) => {
  console.log(id, "id do USUARIO")
  const { isAuthenticated, user } = useContext(AuthContext);
  const logado = user?.id;
  //
  //SALVAR
  const [perfil, setPerfil] = useState({
    imgURL: "",
    ocupacao: "",
    bi: "",
    sobre: "",
    // userId: id
  });
  //
  const [telefone, setTelefone] = useState('');
  const [imgURL, setImgURL] = useState("");
  const [sobre, setSobre] = useState('');

  const { ocupacao, bi } = perfil;

  const onInputChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const savePerfil = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imgURL", imgURL);
    formData.append("ocupacao", ocupacao);
    formData.append("bi", bi);
    formData.append("sobre", sobre);
    // formData.append("userId", id);
    //
    // await createPerfil(formData)
    await salvePerfil(formData)
      .then((response) => {
        messages.mensagemSucesso("Salvo com sucesso", response.data);
    // props.VerMateria();
        // props.Materias;
      })
      .catch((error) => {
        messages.mensagemErro("Erro ao salvar", error);
      });
  }
  //Buscar imagem
  const showPreview = (e) => {
    if (e.target.files.length > 0) {
      setImgURL(e.target.files[0]);
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  };
  //
  const modules = { toolbar: { container } };
  //
  return (
    <div>
      <div className="form-input-content">
        <div className="card login-form mb-0">
          <div className="card-body pt-5" style={{ textAlign: "center" }}>
            <form className="mt-5 mb-5 login-input" enctype="multipart/form-data" onSubmit={savePerfil}>
              {/*  */}
              <div className="form-group" >
                <div className="preview">
                  <img id="file-ip-1-preview" width="100%" />
                </div>
                {/* </div> */}
                <label className="custom-btn" for="file-ip-1">
                  carregar_foto
                </label>
                <input
                  type="file"
                  id="file-ip-1"
                  accept="imgURL/*"
                  name="imgURL"
                  className="form-control"
                  onChange={(e) => showPreview(e)}
                  hidden
                ></input>
              </div>
              {/*  */}
              <div className="form-group">
                <input type="text"
                  className="form-control"
                  placeholder="Ocupação"
                  name='ocupacao'
                  value={ocupacao}
                  onChange={onInputChange}
                />
                {/* {errors.ocupacao && (
        <div className="error-text">{errors.ocupacao}</div>
    )} */}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="bi"
                  name='bi'
                  value={bi}
                  onChange={onInputChange}
                />
                {/* {errors.bi && (
        <div className="error-text">{errors.bi}</div>
    )} */}
              </div>

              <div className="form-group">
                <PhoneInput
                  defaultCountry="ao"
                  disableSearchIcon={true}
                  disableDropdown={true}
                  inputStyle={{

                    width: "100%",
                    outline: "none",
                  }}
                  value={telefone}
                  onChange={(telefone) => setTelefone(telefone)}
                />
              </div>

              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  className='editor'
                  name="sobre"
                  value={sobre}
                  onChange={setSobre}
                />
                {/* {errors.password && (
        <div className="error-text">{errors.password}</div>
    )} */}
              </div>
              <button className="btn primary_btn w-100">Salvar</button>
            </form>
          </div>
        </div>
      </div></div>
  )
}
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
export default EditAccount