import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  Layout,
  LoginPage,
  LoginSuccessful,
  RegistrationPage,
} from "../../components"

import configureReduxStore from "../../redux/store"

const store = configureReduxStore()

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/success" element={<LoginSuccessful />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}

