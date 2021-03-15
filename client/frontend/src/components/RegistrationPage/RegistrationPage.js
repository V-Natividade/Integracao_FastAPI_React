import React from "react"
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
} from "@elastic/eui"
import { RegistrationForm } from "../../components"


export default function RegistrationPage() {
  return (
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <RegistrationForm />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
  )
}

