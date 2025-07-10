import React, { useState } from "react";
import { contactoSchema } from "../../components/validation/Schema";
import { createContacto } from "../../services/ContactoService";
import * as Yup from "yup";
import * as messages from "../../components/message/toastr";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import Cookies from "js-cookie";

//
const phoneUtil = PhoneNumberUtil.getInstance();

// const isPhoneValid = (telefone: string) => {
//   try {
//     return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(telefone));
//   } catch (error) {
//     return false;
//   }
// };

//

const Contact = () => {
  //SALVAR
  const [contacto, setContacto] = useState({
    email: "",
    assunto: "",
    telefone: "",
    mensagem: "",
  });

  const { email, assunto, mensagem } = contacto;
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState({});
  // const isValid = isPhoneValid(telefone);

  const handleChange = (e, errorMessage) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: errorMessage || "",
    }));
  };

  //Limpar Campos
  const handleClear = () => {
    setContacto({
      email: "",
      assunto: "",
      mensagem: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contacto = {
      email,
      assunto,
      telefone,
      mensagem,
    };
    // Verifica se o email já está presente nos cookies
    const emailsSalvos = Cookies.get("emailsSalvos");
    if (emailsSalvos && emailsSalvos.split(",").includes(email)) {
      messages.mensagemAlerta("Este email já foi cadastrado.");
      return;
    }
    // Salva o email nos cookies
    const novosEmails = emailsSalvos ? `${emailsSalvos},${email}` : email;
    Cookies.set("emailsSalvos", novosEmails);

    // Aqui você pode prosseguir com a lógica para salvar os dados, por exemplo, enviando para o backend
    // messages.mensagemSucesso('Email cadastrado com sucesso.');
    try {
      contactoSchema.validateSync(contacto, { abortEarly: false });
      const result = await createContacto(contacto);
      console.log(result);
      messages.mensagemSucesso("Salvo com sucesso!", result.data);
      // setContacto(result.data)
      handleClear();
    } catch (error) {
      console.log(error.message);
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        messages.mensagemErro("Ocorreu um erro. Tente novamente!");
      }
    }
  };

  return (
    <div>
      {/* <!--contact start --> */}
      <section id="contact" className="contact">
        <div className="section-heading text-center">
          <h2>contactar</h2>
        </div>
        <div className="container">
          <div className="contact-content">
            <div className="row">
              <div className="col-md-offset-1 col-md-5 col-sm-6">
                <div className="single-contact-box">
                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email*"
                              name="email"
                              value={email}
                              onChange={handleChange}
                            />

                            {errors.email && (
                              <div className="error-text">{errors.email}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <select
                              className="form-control"
                              id="assunto"
                              name="assunto"
                              value={assunto}
                              onChange={handleChange}
                            >
                              <option value="">
                                Selecione uns dos Serviços
                              </option>
                              <option value="WebSite">WebSite</option>
                              <option value="App">App</option>
                              <option value="Seo">SEO</option>
                              <option value="Outros">Outros</option>
                            </select>
                            {errors.assunto && (
                              <div className="error-text">{errors.assunto}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-sm-12">
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
                          {/* {!isValid && <div style={{ color: 'red' }}>Phone is not valid</div>} */}
                        </div>
                      </div>
                      {/*  */}
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              rows="8"
                              id="mensagem"
                              name="mensagem"
                              placeholder="Mensagem"
                              value={mensagem}
                              onChange={handleChange}
                            ></textarea>
                            {errors.mensagem && (
                              <div className="error-text">
                                {errors.mensagem}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="single-contact-btn">
                            <button type="submit" className="contact-btn">
                              Enviar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>{" "}
              <div className="col-md-offset-1 col-md-5 col-sm-6">
                <div className="single-contact-box">
                  <div className="contact-adress">
                    <div className="contact-add-head">
                      <h3>Ej-News</h3>
                      <p>
                        seu portal de informações rápidas, relevantes e
                        confiáveis. Aqui você encontra as principais notícias do
                        momento sobre <strong>política</strong>,{" "}
                        <strong>economia</strong>, <strong>cultura</strong>,
                        <strong>esportes</strong> e <strong>tecnologia</strong>,
                        tudo com uma linguagem clara e direta. Nosso compromisso
                        é manter você sempre bem informado, onde quer que
                        esteja.
                      </p>
                    </div>
                    <div className="contact-add-info">
                      <div className="single-contact-add-info">
                        <h3>Telefone</h3>
                        <p> +244 942 67 02 73</p>
                      </div>
                      <div className="single-contact-add-info">
                        <h3>email</h3>
                        <p>ernestojustino9@gmail.comm</p>
                      </div>
                    </div>
                  </div>
                  <div className="hm-foot-icon">
                    <ul>
                      <li>
                        <a
                          href="https://web.facebook.com/ejdeveloper"
                          target="_blank"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/ernestojustino9"
                          target="_blank"
                        >
                          <i className="fa fa-whatsapp"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/ernestojustino9"
                          target="_blank"
                        >
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/ernestojustino9"
                          target="_blank"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/in/ernesto-justino-6702091a0/"
                          target="_blank"
                        >
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
