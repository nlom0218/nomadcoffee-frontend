import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  font-size: 30px;
  margin: 30px 0px;
`

const NotFound = () => {
  return (<Container>
    <Title>
      404 Not Found
    </Title>
    <Link to="/">back to the home</Link>
  </Container>);
}

export default NotFound;