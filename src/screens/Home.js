import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import DarkModeBtn from '../components/DarkModeBtn';
import PageTitle from '../components/PageTitle';
import useUser from '../hooks/useUser';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SEE_COFFEE_SHOPS = gql`
   query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      photos {
        url
      }
    }
  }
`
const Home = () => {
  const { loading, data } = useQuery(SEE_COFFEE_SHOPS)
  console.log(data);
  return (<Container>
    <PageTitle title="홈" />
    {loading ? null : data?.seeCoffeeShops.map((item, index) => <div key={index}>
      {item.name}
      <img src={item.photos[0]?.url} />
    </div>)}
  </Container>);
}

export default Home;