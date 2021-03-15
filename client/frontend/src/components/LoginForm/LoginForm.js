import React from "react"
import { connect } from "react-redux"
import { Actions as authActions, FETCHING_USER_FROM_TOKEN_SUCCESS } from "../../redux/auth"
import { useNavigate } from "react-router-dom"
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiSpacer
} from "@elastic/eui"
import { Link } from "react-router-dom"
import validation from "../../utils/validation"
import styled from "styled-components"

const LoginFormWrapper = styled.div`
  padding: 2rem;
`
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`

function LoginForm({ user, authError, isLoading, isAuthenticated, requestUserLogin }) {
  const [form, setForm] = React.useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = React.useState({})
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/success")
    }
  }, [user, navigate, isAuthenticated])

  const validateInput = (label, value) => {
    // Executa a função de validação na entrada, se existir
    // Se não existir, assume que a entrada é válida
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // seta um erro se a validação não retornar True
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  }

  const handleInputChange = (label, value) => {
    validateInput(label, value)

    setForm((form) => ({ ...form, [label]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // valida a entrada antes de enviar
    Object.keys(form).forEach((label) => validateInput(label, form[label]))
    // Se uma entrada não for inserida, retorna um aviso
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({ ...errors, form: `Você deve preencher todos os campos.` }))
      return
    }

    setHasSubmitted(true)
    const action = await requestUserLogin({ email: form.email, password: form.password })
    // limpa o campo da senha se a tentativa de login falhar
    if (action?.type !== FETCHING_USER_FROM_TOKEN_SUCCESS) {
      setForm((form) => ({ ...form, password: "" }))
    }
  }

  const getFormErrors = () => {
    const formErrors = []
    if (authError && hasSubmitted) {
      formErrors.push(`Credenciais inválidas. Por favor, tente novamente`)
    }
    if (errors.form) {
      formErrors.push(errors.form)
    }
    return formErrors
  }

  return (
    <LoginFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Email"
          helpText="Digite seu email."
          isInvalid={Boolean(errors.email)}
          error={`Por favor, digite um email válido.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="josé@gmail.com"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Digite seu email."
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Senha"
          helpText="Digite sua senha."
          isInvalid={Boolean(errors.password)}
          error={`A senha deve ter pelo menos 7 caracteres.`}
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
        <EuiSpacer />
        <EuiButton type="submit" fill isLoading={isLoading}>
          Enviar
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Precisa de uma conta? Increva-se <Link to="/registration">aqui</Link>.
      </NeedAccountLink>
    </LoginFormWrapper>
  )
}

const mapStateToProps = (state) => ({
  authError: state.auth.error,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  requestUserLogin: ({ email, password }) =>
    dispatch(authActions.requestUserLogin({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
