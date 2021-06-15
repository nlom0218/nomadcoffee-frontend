import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SBasicHomeTitle = styled.div`
  display: flex;
  font-size: 36px;
  svg {
    margin-right: 20px;
  }
  margin-bottom: 10px;
`

const BasicHomeTitle = ({ title }) => {
  return (<SBasicHomeTitle>
    <FontAwesomeIcon icon={faCoffee} />
    <div>{title}</div>
  </SBasicHomeTitle>);
}

export default BasicHomeTitle;