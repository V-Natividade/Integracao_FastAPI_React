import React from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "../../components";
import styled from "styled-components";
import "@elastic/eui/dist/eui_theme_light.css";
import "../../assets/css/fonts.css";
import "../../assets/css/override.css";


const StyledLayout = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(224, 228, 234);
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create/Login</title>
      </Helmet>
        <StyledLayout>
          <Navbar />
          <StyledMain>{ children }</StyledMain>
        </StyledLayout>
    </React.Fragment>
  );
}
