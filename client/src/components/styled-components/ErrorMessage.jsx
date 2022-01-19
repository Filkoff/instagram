import React from 'react';

import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  color: red;
`;

function ErrorMessage(props) {
  return <StyledErrorMessage {...props} />;
}

export default ErrorMessage;
