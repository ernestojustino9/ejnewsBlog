import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


// Esquema de validação para campos de usuário (CADASTRO)
export const registroSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório"),
  password: Yup.string()
      .required("Senha é obrigatória")
      .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
          "Senha deve conter pelo menos uma letra maiúscula, um número e um símbolo, e ter no mínimo 8 caracteres"
      )
});

// Esquema de validação para campos de usuário (CADASTRO)
export const contactoSchema = Yup.object().shape({
  email: Yup.string()
    .required("Preencha o campo E-mail!")
    .email("Formato de email inválido. Ex.: teste@gmail.com"),

  assunto: Yup.string()
    .required("Preencha o campo Assunto!")
    .matches(/^[a-zA-Zà-úÀ-Ú\s]+$/, "Somente é permitido o uso de letras!"),

    // telefone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')

  mensagem: Yup.string()
    .required("Preencha o campo Assunto!"),

});

// Esquema de validação para campos de usuário (CADASTRO)
export const subescreverSchema = Yup.object().shape({
  email: Yup.string()
    .required("Preencha o campo E-mail!")
    .email("Formato de email inválido. Ex.: teste@gmail.com"),

});

// Esquema de validação para campos gerais
export const validationSchema = Yup.object().shape({
  descricao: Yup.string()
    .required("Preencha o campo Descrição!")
    .min(4, "Mínimo 4 digitos")
    .max(30, "Máximo 30 digitos")
    .matches(/^[a-zA-Zà-úÀ-Ú\s]+$/, "Somente é permitido o uso de letras!"),
});

// Esquema de validação para campos do login
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Preencha o campo e-mail!")
    .email("Formato de email inválido. Ex.: teste@gmail.com")
    .min(10, "Minimo 10 digitos!")
    .max(30, "Máximo 30 digitos!"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve conter pelo menos 6 caracteres"),
});

// Esquema de validação para campos do desaparecidos
export const desaparecidoSchema = Yup.object().shape({
  descricao: Yup.string().required("Preencha o campo Descrição!"),
  nome: Yup.string()
    .required("Preencha o campo Nome!")
    .min(3, "Mínimo 3 digitos!"),
  sobrenome: Yup.string()
    .required("Preencha o campo Sobrenome!")
    .min(3, "Mínimo 3 digitos!"),
  nomePai: Yup.string()
    .required("Preencha o campo Nome do Pai!")
    .min(3, "Mínimo 3 digitos!"),
  nomeMae: Yup.string()
    .required("Preencha o campo Nome da Mâe!")
    .min(3, "Mínimo 3 digitos!"),
  genero: Yup.string()
    .required("Preencha o campo Genero!")
    .max(1, "Máximo 1 digitos!"),
  contacto: Yup.string()
    .required("Preencha o campo Telefone!")
    .min(9, "Mínimo 9 digitos!")
    .max(14, "Máximo 14 digitos!"),
  email: Yup.string()
    .required("Preencha o campo e-mail!")
    .email("Formato de email inválido. Ex.: teste@gmail.com")
    .min(10, "Minimo 10 digitos!")
    .max(30, "Máximo 30 digitos!"),
  nacionalidade: Yup.string()
    .required("Preencha o campo Nacionalidade!")
    .min(3, "Mínimo 3 digitos!")
    .max(30, "Máximo 30 digitos!"),
  // dataDesaparecido: Yup.string().required(
  //   "Preencha o campo Data de Desaparecimento!"
  // ),
  // url: Yup.string().required("Selecione a imagem!"),
  dataDesaparecido: Yup.date()
    .typeError("A data de desaparecimento deve ser uma data válida")
    .required("A data de desaparecimento é obrigatória"),
});

// Esquema de validação para campos do episodios
export const episodioSchema = Yup.object().shape({
  descricao: Yup.string()
    .required("Preencha o campo Descrição!")
    .min(3, "Mínimo 3 digitos!"),
  // artigoId: Yup.string().required("Preencha o campo Artigo!"),
  usuarioId: Yup.string().required("Preencha o campo Usuario!"),
  // dataPerdido: Yup.string().required(
  //   "Preencha o campo Data que perdeu!"
  // ),
  // url: Yup.string().required("Selecione a imagem!"),
});

export const denunciaSchema = Yup.object().shape({
  assunto: Yup.string().required("Preencha o campo Assunto!"),
  descricao: Yup.string().required("Preencha o campo Descrição!"),
});

// Esquema de validação para campos de usuário
export const utilizadorSchema = Yup.object().shape({
  email: Yup.string()
    .required("Preencha o campo E-mail!")
    .email("Formato de email inválido. Ex.: teste@gmail.com")
    .min(12, "Mínimo 12 digitos!")
    .max(60, "Máximo 60 digitos!"),
  password: Yup.string()
    .required("Insira sua Senha!")
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial. Ex.: exEmpLo#00"
    // )
    .min(8, "Mínimo 8 digitos!")
    .max(12, "Máximo 12 digitos!"),
  password1: Yup.string()
    .required("Insira sua Senha!")
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial. Ex.: exEmpLo#00"
    // )
    .min(8, "Mínimo 8 digitos!")
    .max(12, "Máximo 12 digitos!"),
  bi: Yup.string()
    .required("Preencha o campo Bilhete de Identidade!")
    .min(14, "Mínimo 14 digitos!")
    .max(14, "Máximo 14 digitos!")
    .matches(
      // /^(\d{9}[A-Z]\d{3})$/,
      /[0-9]{9}[A-Z]{2}[0-9]{3}$/,
      "Formato de BI inválido. Exemplo: 000000000HA000"
    ),
});

// Função para validar um objeto de valores com base no esquema fornecido
export function validateForm(values, schema) {
  try {
    schema.validateSync(values, { abortEarly: false });
    return {}; // Retorna um objeto vazio se a validação for bem-sucedida
  } catch (errors) {
    const validationErrors = {};
    errors.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });
    return validationErrors;
  }
}
