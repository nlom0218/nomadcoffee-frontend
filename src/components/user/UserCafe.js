import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../Loading';

const SEE_USER_COFFEE_SHOP = gql`
  query seeUserCoffeeShop($username: String!) {
    seeUserCoffeeShop(username: $username) {
      id
      name
      photos {
        url
        rep
      }
    }
  }
`

const CoffeeShops = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns:  1fr 1fr;
  gap: 40px 30px;
`

const CoffeeShop = styled.div`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.boxShadowColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
`

const ShopPhoto = styled.img`
  width: 26vw;
  height: 30vh;
`

const ShopName = styled.span`
  padding: 10px 20px;
`

const UserCafe = ({ username }) => {
  console.log(username);
  const { data, loading } = useQuery(SEE_USER_COFFEE_SHOP, { variables: { username } })
  console.log(data);
  const findRepPhoto = (item) => {
    const photo = item.photos.find(photo => photo.rep === true)
    if (photo) {
      return photo.url
    }
    return null
  }
  return (loading ? <Loading /> : <CoffeeShops>
    {data?.seeUserCoffeeShop.map((item, index) =>
      <Link key={index} to={`/shop/${item.id}`}>
        <CoffeeShop>
          <ShopPhoto src={findRepPhoto(item) || item.photos[0].url} />
          <ShopName>{item.name}</ShopName>
        </CoffeeShop></Link>)}
  </CoffeeShops>);
}

export default UserCafe;