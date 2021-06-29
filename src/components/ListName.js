import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SListName = styled.div`
  :not(:last-child) {
    margin-bottom: 30px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 20px;
    font-size: 10px;
  }
  span {
    font-size: 22px;
    cursor: pointer;
  }
`

const ListName = ({ children }) => {
  return (<SListName>
    <FontAwesomeIcon icon={faCircle} />
    {children}
  </SListName>);
}

export default ListName;