import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pageVar, setPage } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageControl from '../components/pageControl';
import PageTitle from '../components/PageTitle';

const SEE_COFFEE_SHOPS = gql`
   query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      shops {
        id
        name
        photos {
          url
          rep
        }
      }
      totalShops
    }
  }
`

const TitleAndPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`


const CoffeeShops = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 40px 20px;
  
`

const CoffeeShop = styled.div`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.boxShadowColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const ShopPhoto = styled.img`
  width: 26vw;
  height: 30vh;
`

const ShopName = styled.span`
  padding: 10px 20px;
`

const Home = () => {
  const page = useReactiveVar(pageVar)
  const { loading, data } = useQuery(SEE_COFFEE_SHOPS, {
    variables: { page }
  })

  const findRepPhoto = (item) => {
    const photo = item.photos.find(photo => photo.rep === true)
    if (photo) {
      return photo.url
    }
    return null
  }

  return (
    <>
      <Header />
      <BasicContainer>
        <PageTitle title="홈" />
        {loading ? <Loading /> : <>
          <TitleAndPage>
            <BasicHomeTitle title="Nomad Coffee" />
            <PageControl totalShops={data?.seeCoffeeShops?.totalShops} />
          </TitleAndPage>
          <CoffeeShops>
            {data?.seeCoffeeShops.shops.map((item, index) =>
              <Link key={index} to={`/shop/${item.id}`}>
                <CoffeeShop>
                  <ShopPhoto src={findRepPhoto(item) || item.photos[0].url} />
                  <ShopName>{item.name}</ShopName>
                </CoffeeShop></Link>)}
          </CoffeeShops></>}
      </BasicContainer>
    </>);
}

export default Home;