import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SMsgContainer = styled.div`
  margin-bottom: 10px;
  a {
    margin-left: 10px;
    color: ${props => props.theme.boxColor};
    font-weight: 600;
  }
`
const Message = styled.span``

const MsgContainer = ({ msg, link, linkText }) => {
  return (<SMsgContainer>
    <Message>{msg}</Message>
    <Link to={link}>{linkText}</Link>
  </SMsgContainer>);
}

export default MsgContainer;