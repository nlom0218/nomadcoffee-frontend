import { useQuery } from '@apollo/client';
import { faCoffee, faEdit, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DarkModeBtn from '../components/DarkModeBtn';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      categories {
        name
      }
      isMine
      user {
        username
      }
      photos {
        url
        rep
      }
    }
  }
`

const Container = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
`

const ShopContainer = styled.div`
  min-height: 100vh;
  width: 1200px;
  min-width: 1200px;
  background-color: ${props => props.theme.opacityBgColor};
`

const ShopInfo = styled.div`
  margin: 60px 100px 0px 100px;
  svg {
    margin-right: 20px;
  }
`

const ShopName = styled.div`
  font-size: 100px;
  font-weight: 600;
`

const ShopOwner = styled.div`
  margin: 50px 0px 30px 0px;
  font-size: 50px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div {
    margin-left: 20px;
    cursor: pointer;
  }
`

const ShopCategories = styled.div`
  margin: 20px 0px;
  font-size: 50px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`

const Category = styled.span`
    margin-right: 20px;
    cursor: pointer;
  `

const CategoryUL = styled.div`
  margin-bottom: 20px;
`

const CategoryLI = styled.div`
  font-size: 40px;
  font-weight: 400;
`

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  padding-right: 100px;
  font-size: 20px;
  a {
    margin-left: 20px;
    color: ${props => props.theme.fontColor};
  }
`

const ShopDetail = () => {
  const { id } = useParams()
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, { variables: { id: parseInt(id) } })
  console.log(data);
  const repPhotoUrl = (data) => {
    if (!data) {
      return
    } else {
      const repPhoto = data.seeCoffeeShop.photos.find(item => item.rep === true)
      console.log(repPhoto);
      if (repPhoto) {
        return repPhoto.url
      } else {
        return null
      }
    }
  }
  return (
    loading ? <Loading /> :
      <>
        <PageTitle title={data?.seeCoffeeShop?.name} />
        <Container
          style={{
            backgroundImage: `url(${repPhotoUrl(data) ? repPhotoUrl(data) : data?.seeCoffeeShop.photos[0]?.url})`
          }}>
          <ShopContainer>
            <Nav>
              <DarkModeBtn />
              <Link to={routes.HOME} ><FontAwesomeIcon icon={faHome} /></Link>
              <Link
                to={`/shop/edit/${data?.seeCoffeeShop?.id}`}
              >{data?.seeCoffeeShop?.isMine ? <FontAwesomeIcon icon={faEdit} /> : null}</Link>
            </Nav>
            <ShopInfo>
              <ShopName>
                {data?.seeCoffeeShop?.name}
              </ShopName>
              <ShopOwner>
                <FontAwesomeIcon icon={faCoffee} />
              Cafe Owner:
              <div>{data?.seeCoffeeShop?.user?.username}</div>
              </ShopOwner>
              <ShopCategories>
                <FontAwesomeIcon icon={faCoffee} />
                <div>
                  <CategoryUL>
                    Categories
                </CategoryUL>
                  <CategoryLI>
                    <span>{data?.seeCoffeeShop?.categories.map((item, index) => {
                      return <Category key={index}>
                        {item.name}
                      </Category>
                    })}</span>
                  </CategoryLI>
                </div>
              </ShopCategories>
            </ShopInfo>
          </ShopContainer>
        </Container >
      </>
  );
}

export default ShopDetail;