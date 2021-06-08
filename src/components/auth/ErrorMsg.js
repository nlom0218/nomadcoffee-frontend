import React from 'react';
import styled from 'styled-components';

const SErroMsg = styled.div`
  margin-bottom: 10px;
  color: ${props => props.theme.bgColor};
  font-size: 14px;
`

const ErrorMsg = ({ msg }) => {
  return (msg ? <SErroMsg>
    {msg}
  </SErroMsg> : null);
}

export default ErrorMsg;