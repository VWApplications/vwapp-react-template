import React from "react";
import styled from "styled-components";
import { Button, Spinner } from "react-bootstrap";

// COMPONENTES
export const Main = ({ children }) => <StyledMain>{children}</StyledMain>;

export const Loading = props => (
  <CustomLoading>
    <Spinner {...props} animation="border" /> <span>Carregando...</span>
  </CustomLoading>
);

export const Title = ({ children }) => <h1>{children}</h1>;

export const SubmitButton = ({ disabled, children }) => (
  <DisabledButton block variant="dark" type="submit" disabled={disabled}>
    <i className="fa fa-send"></i> {children}
  </DisabledButton>
);

// ESTILOS
const StyledMain = styled.main`
  margin-top: 70px;
`;

const DisabledButton = styled(Button)`
  cursor: no-drop;
`;

const CustomLoading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;

  > span {
    padding-left: 20px;
    font-size: 22px;
  }
`;
