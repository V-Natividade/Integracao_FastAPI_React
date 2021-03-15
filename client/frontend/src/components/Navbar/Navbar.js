import React from "react";
import { connect } from "react-redux";
import { Actions as authActions } from "../../redux/auth";
import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import { useNavigate } from "react-router-dom";

function Navbar({ logUserOut }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logUserOut();
    navigate("/");
  };

  return (
    <EuiFlexGroup justifyContent="spaceBetween">
      <EuiFlexItem>
          <EuiButton color="primary" fill onClick={() => handleLogout()}>Sair</EuiButton>
        </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default connect((state) => ({ user: state.auth.user }), {
  logUserOut: authActions.logUserOut,
})(Navbar);
