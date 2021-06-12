import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

const SEE_COFFEE_SHOP_PHOTO = gql`
  query seeCoffeeShopPhoto($id: Int!) {
    seeCoffeeShopPhoto(id: $id) {
      url
      id
    }
  }
`

const DELETE_COFFEE_SHOP_PHOTO = gql`
  mutation deleteCoffeeShopPhoto($photoId: Int!) {
    deleteCoffeeShopPhoto(photoId: $photoId) {
      ok
      error
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 20px;
`

const PhotoContainer = styled.div`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.boxShadowColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  display: flex;
  flex-direction: column;
`

const Photo = styled.img`
  width: 26vw;
  height: 30vh;
`

const DelBtn = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  cursor: pointer;
`

const DelPhoto = ({ id }) => {
  const { data, loading } = useQuery(SEE_COFFEE_SHOP_PHOTO, { variables: { id } })
  const [deleteCoffeeShopPhoto, { loading: delLoading }] = useMutation(DELETE_COFFEE_SHOP_PHOTO, {
    onCompleted: () => window.location.reload()
  })
  const onClickDelBtn = (e) => {
    const { target: { id } } = e
    if (delLoading) {
      return
    }
    deleteCoffeeShopPhoto({ variables: { photoId: parseInt(id) } })
  }
  return (loading ? <Loading /> : <Container>
    {data?.seeCoffeeShopPhoto?.map((item, index) => <PhotoContainer key={index}>
      <Photo src={item.url} />
      <DelBtn onClick={onClickDelBtn} id={item.id}>삭제하기</DelBtn>
    </PhotoContainer>
    )}
  </Container>);
}

export default DelPhoto;