import React from "react";
import styled from "styled-components";
const StyledAvatar = styled.img`
  width: ${(props) => props.size || "25px"};
  height: ${(props) => props.size || "25px"};
  border-radius: 50%;
  cursor: pointer;
  margin: 0.5rem;
`;

function Avatar(props) {
  return <StyledAvatar {...props} />;
}

export default Avatar;
