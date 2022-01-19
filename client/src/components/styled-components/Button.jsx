import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #0095f6;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1rem;
  height: 2rem;
  padding: 0 1rem;
  border: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;

function Button(props) {
  return <StyledButton {...props} />;
}

export default Button;
