import React from 'react';
import styled from 'styled-components';

const SListContainer = styled.div`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* border-right: 1px solid ${props => props.theme.fontColor}; */
  padding-right: 20px;
  margin-right: 80px;
`

const ListContainer = ({ children }) => {
  return (<SListContainer>
    {children}
  </SListContainer>);
}

export default ListContainer;