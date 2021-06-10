import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.boxColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  width: 100%;
  max-width: 100%;
  padding: 20px 0px;
  margin-bottom: 20px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
  }
`

const FormLayout = ({ children }) => {
  return (<FormContainer>
    {children}
  </FormContainer>);
}

export default FormLayout;