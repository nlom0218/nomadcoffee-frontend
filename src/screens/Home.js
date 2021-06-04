import React from 'react';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import DarkModeBtn from '../components/DarkModeBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  font-size: 30px;
  margin: 30px 0px;
`

const Button = styled.button`
  font-size: 20px;
  margin-bottom: 30px;
`

const Home = () => {
  return (<Container>
    <Title>Welcome to Nomad Coffee</Title>
    <Button onClick={() => isLoggedInVar(false)}>Logout</Button>
    <DarkModeBtn />
  </Container>);
}

export default Home;