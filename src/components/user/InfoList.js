import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  margin-bottom: 20px;
  a {
    color: ${props => props.theme.fontColor};
  }
`

const List = styled.div`
  margin: 0px 10px 0px 5px;
`

const InfoList = ({ info, list, link }) => {
  return (<Container>
    <FontAwesomeIcon icon={faCoffee} />
    <List>{list}:</List>
    {link ?
      <a href={`https://github.com/${info}`} target="_blank"><span>{info}</span></a>
      :
      <span>{info}</span>}
  </Container>);
}

export default InfoList;