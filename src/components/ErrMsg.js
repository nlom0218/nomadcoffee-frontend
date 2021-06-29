import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.bgColor};
`

const ErrEmogi = styled.span`

`

const SErrMsg = styled.span`
  margin-left: 10px;
`

const ErrMsg = ({ errMsg }) => {
  return (
    <Container>
      <ErrEmogi>😭</ErrEmogi>
      <SErrMsg>{errMsg}</SErrMsg>
    </Container>
  );
}

export default ErrMsg;