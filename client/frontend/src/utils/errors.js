export const errorFieldToMessageMapping = {
  email: "Por favor, digite um email válido.",
  username:
    "Por favor, digite um nome que contenha apenas letras, números, sublinhados e travessões.",
  password: "Por favor, digite uma senha com no mínimo 7 caracteres.",
};

export const parseErrorDetail = (errorDetail) => {
  let errorMessage = "Aconteceu algo que não esperávamos, contate o suporte";

  if (Array.isArray(errorDetail?.loc)) {
    // erro de path inválido
    if (errorDetail.loc[0] === "path") return errorMessage;
    // erro com parâmetro de consulta
    if (errorDetail.loc[0] === "query") return errorMessage;
    // pelo fato de usar Body(..., embed)` nas requisições pro servidor
    // o corpo deve ser uma lista com os três parâmetros: ["body", "new_user", "email"]
    if (errorDetail.loc[0] === "body") {
      const invalidField = errorDetail.loc[2];

      if (errorFieldToMessageMapping[invalidField]) {
        errorMessage = errorFieldToMessageMapping[invalidField];
      } else if (errorDetail?.msg) {
        errorMessage = errorDetail.msg;
      }
    }
  }

  return errorMessage;
};

export const extractErrorMessages = (error) => {
  const errorList = [];

  // se o erro é uma string, passa a mensagem
  if (typeof error === "string") errorList.push(error);

  // se o erro já vem como string do servidor, passa apenas a mensagem
  if (typeof error?.detail === "string") errorList.push(error.detail);

  // caso haja um erro de validação no corpo da solicitação
  // os problemas apareceram aqui
  if (Array.isArray(error?.detail)) {
    error.detail.forEach((errorDetail) => {
      const errorMessage = parseErrorDetail(errorDetail);
      errorList.push(errorMessage);
    });
  }

  return errorList;
};
