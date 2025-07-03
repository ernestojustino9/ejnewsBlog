import toastr from "toastr";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  // positionClass: "toast-top-right",
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};


export function mostrarMensagem(mensagem, tipo) {
  toastr[tipo](mensagem);
}

export function mensagemErro(mensagem) {
  mostrarMensagem(mensagem, "error");
}

export function mensagemSucesso(mensagem) {
  mostrarMensagem(mensagem, "success");
}

export function mensagemInformacao(mensagem) {
  mostrarMensagem(mensagem, "info");
}

export function mensagemAlerta(mensagem) {
  mostrarMensagem(mensagem, "warning");
}