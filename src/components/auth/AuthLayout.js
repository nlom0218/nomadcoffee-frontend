import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleIcon = styled.h1`
  font-size: 30px;
  margin: 30px 0px 5px 0px;
`


const AuthLayout = ({ children }) => {
  return (<Container>
    <TitleIcon><FontAwesomeIcon icon={faCoffee} /></TitleIcon>
    {children}
  </Container>);
}

export default AuthLayout;