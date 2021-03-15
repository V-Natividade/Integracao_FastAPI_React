import React from "react";
import { EuiEmptyPrompt } from "@elastic/eui";

export default function LoginSuccessful({
  congratulations = "Parabéns,",
  welcome = `é bom ver você por aqui`,
}) {
  return (
    <EuiEmptyPrompt
      iconType="check"
      title={<h2>{congratulations} você está logado!</h2>}
      body={<p>{welcome}</p>}
    />
  );
}
