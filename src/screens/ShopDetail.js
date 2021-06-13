import { useQuery } from '@apollo/client';
import { faCoffee, faEdit, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setEdit, setUser } from '../apollo';
import DarkModeBtn from '../components/DarkModeBtn';
import LikesBtn from '../components/LikesBtn';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      isLiked
      likes
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
  height: 100vh;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
`

const ShopContainer = styled.div`
  width: 70%;
  min-width: 1000px;
  background-color: ${props => props.theme.opacityBgColor};
`

const ShopInfo = styled.div`
  margin: 20px 100px 30px 100px;
  svg {
    margin-right: 20px;
  }
`

const ShopName = styled.div`
  font-size: 80px;
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
    color: ${props => props.theme.fontColor};
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
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 100px;
  font-size: 24px;
  a {
    margin-left: 20px;
    color: ${props => props.theme.fontColor};
  }
`

const ImgContainer = styled.div`
  position: absolute;
  height: 95vh;
  top: 30px;
  right: 30px;
  bottom: -30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
`

const ImgTitle = styled.div`
  background-color: ${props => props.theme.opacityBgColor};
  border-radius: 5px;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`

const ShopImg = styled.img`
  width: 20vw;
  height: 25vh;
  :not(last-child){
    margin-bottom: 20px;
  }
  border-radius: 5%;
`

const ShopDetail = () => {
  const { id } = useParams()
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, { variables: { id: parseInt(id) } })
  const repPhotoUrl = (data) => {
    if (!data) {
      return
    } else {
      const repPhoto = data.seeCoffeeShop.photos.find(item => item.rep === true)
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
              <LikesBtn
                isLiked={data?.seeCoffeeShop?.isLiked}
                likes={data?.seeCoffeeShop?.likes}
                id={data?.seeCoffeeShop?.id}
              />
              <div>
                <DarkModeBtn />
                <Link to={routes.HOME} ><FontAwesomeIcon icon={faHome} /></Link>
                <Link onClick={() => setEdit("basic")}
                  to={`/shop/edit/${data?.seeCoffeeShop?.id}`}
                >{data?.seeCoffeeShop?.isMine ? <FontAwesomeIcon icon={faEdit} /> : null}</Link>
              </div>
            </Nav>
            <ShopInfo>
              <ShopName>
                {data?.seeCoffeeShop?.name}
              </ShopName>
              <ShopOwner>
                <FontAwesomeIcon icon={faCoffee} />
              Cafe Owner:
              <Link to={`/${data?.seeCoffeeShop?.user?.username}`} onClick={() => setUser("basic")}>
                  <div>{data?.seeCoffeeShop?.user?.username}</div>
                </Link>
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
          <ImgContainer>
            <ImgTitle>Cafe Photos</ImgTitle>
            {data?.seeCoffeeShop?.photos.map((item, index) => <React.Fragment key={index}>
              <ShopImg src={item.url} />
            </React.Fragment>)}
          </ImgContainer>
        </Container >
      </>
  );
}

export default ShopDetail;