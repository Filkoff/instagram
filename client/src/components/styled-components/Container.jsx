import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: ${(props) => props.width || "100%"};
  max-height: ${(props) => props.height || "100%"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
`;

function Container(props) {
  return <StyledContainer {...props} />;
}

export default Container;
