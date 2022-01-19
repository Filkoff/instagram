import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  height: 2rem;
  border-radius: 5px;
  font-size: 1rem;
  margin: 0.5rem 0;
  placeholder: ${(props) => props.placeholder};
`;

function Input(props) {
  return <StyledInput {...props} />;
}

export default Input;
