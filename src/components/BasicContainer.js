import React from 'react';
import styled from 'styled-components';

const SBasicContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`

const BasicContainer = ({ children }) => {
  return (<SBasicContainer>
    {children}
  </SBasicContainer>);
}

export default BasicContainer;