import React from "react"
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
} from "@elastic/eui"
import { LoginForm } from "../../components"

export default function LoginPage() {
  return (
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <LoginForm />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
  )
}
