import { makeVar, useQuery, useReactiveVar } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { syntaxError } from 'graphql';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pageVar, setPage } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';

const SEE_COFFEE_SHOPS = gql`
   query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      shops {
        id
        name
        photos {
          url
        }
      }
      totalShops
    }
  }
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

const PageControl = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  background-color: ${props => props.theme.boxShadowColor};
  /* border: 1px solid ${props => props.theme.fontColor}; */
`

const PageNum = styled.div`
  font-weight: 500;
  padding: 5px 20px;
  border-right: 1px solid ${props => props.theme.fontColor};
  cursor: pointer;
`

const Home = () => {
  const page = useReactiveVar(pageVar)
  const { loading, data } = useQuery(SEE_COFFEE_SHOPS, {
    variables: { page }
  })
  const pageNum = Math.ceil(data?.seeCoffeeShops?.totalShops / 6)
  let pageArr = []
  for (let i = 0; i < pageNum; i++) {
    pageArr.push(i + 1)
  }
  console.log(loading, data);
  return (
    <>
      <Header />
      <BasicContainer>
        <PageTitle title="홈" />
        {loading ? <Loading /> : <>
          <BasicHomeTitle title="Nomad Coffee" />
          <PageControl>
            {pageArr.map((item, index) =>
              <PageNum
                key={index}
                onClick={() => {
                  setPage(item)
                }}
              >
                {item}
              </PageNum>)}
          </PageControl>
          <CoffeeShops>
            {data?.seeCoffeeShops.shops.map((item, index) =>
              <Link key={index} to={`/shop/${item.id}`}>
                <CoffeeShop>
                  <ShopPhoto src={item.photos[0]?.url} />
                  <ShopName>{item.name}</ShopName>
                </CoffeeShop></Link>)}
          </CoffeeShops></>}
      </BasicContainer>
    </>);
}

export default Home;