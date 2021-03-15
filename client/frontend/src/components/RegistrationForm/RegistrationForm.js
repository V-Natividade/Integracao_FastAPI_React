import React from "react";
import { connect } from "react-redux";
import {
  Actions as authActions,
  FETCHING_USER_FROM_TOKEN_SUCCESS,
} from "../../redux/auth";
import { useNavigate } from "react-router-dom";
import {
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiSpacer,
} from "@elastic/eui";
import { Link } from "react-router-dom";
import validation from "../../utils/validation";
import { extractErrorMessages } from "../../utils/errors";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import styled from "styled-components";

const RegistrationFormWrapper = styled.div`
  padding: 2rem;
`;
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;

function RegistrationForm({
  authError,
  user,
  isLoading,
  isAuthenticated,
  registerUser,
}) {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const navigate = useNavigate();
  const authErrorList = extractErrorMessages(authError);

  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/success");
    }
  }, [user, navigate, isAuthenticated]);

  const validateInput = (label, value) => {
    // Executa a função de validação na entrada, se existir
    // Se não existir, assume que a entrada é válida
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true;
    // seta um erro se a validação não retornar True
    setErrors((errors) => ({ ...errors, [label]: !isValid }));
  };

  const setAgreedToTermsCheckbox = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };

  const handlePasswordConfirmChange = (value) => {
    setErrors((errors) => ({
      ...errors,
      passwordConfirm:
        form.password !== value ? `As senhas não coincidem.` : null,
    }));

    setForm((form) => ({ ...form, passwordConfirm: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // valida a entrada antes de enviar
    Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // Se alguma entrada não for inserida, retorna um aviso
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({
        ...errors,
        form: `Você deve preencher todos os campos`,
      }));
      return;
    }

    // Validação adicional
    if (form.password !== form.passwordConfirm) {
      setErrors((errors) => ({ ...errors, form: `As senhas não coincidem` }));
      return;
    }

    if (!agreedToTerms) {
      setErrors((errors) => ({
        ...errors,
        form: `Concordo com os termos e condições.`,
      }));
      return;
    }

    setHasSubmitted(true);
    const action = await registerUser({
      username: form.username,
      email: form.email,
      password: form.password,
    });
    if (action?.type !== FETCHING_USER_FROM_TOKEN_SUCCESS) {
      setForm((form) => ({ ...form, password: "", passwordConfirm: "" }));
    }
  };

  const getFormErrors = () => {
    const formErrors = [];

    if (errors.form) {
      formErrors.push(errors.form);
    }

    if (hasSubmitted && authErrorList.length) {
      return formErrors.concat(authErrorList);
    }

    return formErrors;
  };

  return (
    <RegistrationFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Email"
          helpText="Digite seu email"
          isInvalid={Boolean(errors.email)}
          error={`Por favor, digite um email válido.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="josé@gmail.com"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Digite seu email"
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Usuário"
          helpText="Escolha um nome de usuário que contenha apenas letras, números, sublinhados e travessões."
          isInvalid={Boolean(errors.username)}
          error={`Por favor, insira um nome de usuário válido.`}
        >
          <EuiFieldText
            icon="user"
            placeholder="seu_nome"
            value={form.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            aria-label="Escolha um nome de usuário que contenha apenas letras, números, sublinhados e travessões."
            isInvalid={Boolean(errors.username)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Senha"
          helpText="Digite sua senha."
          isInvalid={Boolean(errors.password)}
          error={`A senha deve ter no mínimo 7 caracteres`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Digite sua senha."
            isInvalid={Boolean(errors.password)}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Confirme a senha"
          helpText="Confirme a senha."
          isInvalid={Boolean(errors.passwordConfirm)}
          error={`As senha não coincidem.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.passwordConfirm}
            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
            type="dual"
            aria-label="Confirme a senha."
            isInvalid={Boolean(errors.passwordConfirm)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiCheckbox
          id={htmlIdGenerator()()}
          label="Eu aceito os termos e condições."
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTermsCheckbox(e)}
        />
        <EuiSpacer />
        <EuiButton type="submit" isLoading={isLoading} fill>
          Enviar
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Já possui uma conta? Acesse <Link to="/">aqui</Link>.
      </NeedAccountLink>
    </RegistrationFormWrapper>
  );
}

export default connect(
  (state) => ({
    authError: state.auth.error,
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }),
  {
    registerUser: authActions.registerNewUser,
  }
)(RegistrationForm);
