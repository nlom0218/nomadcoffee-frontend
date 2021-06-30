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
      rep
    }
  }
`

const SET_REP_PHOTO = gql`
  mutation setRepPhoto($shopId: Int!, $photoId: Int!) {
    setRepPhoto(shopId: $shopId, photoId: $photoId) {
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
  width: 100%;
  height: 33vh;
`

const RepBtn = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  cursor: pointer;
`

const EditRepPhoto = ({ id: shopId }) => {
  const { data, loading } = useQuery(SEE_COFFEE_SHOP_PHOTO, { variables: { id: shopId } })
  const [setRepPhoto, { loading: repLoading }] = useMutation(SET_REP_PHOTO, {
    onCompleted: () => window.location.reload()
  })
  const onClicRepBtn = (e) => {
    const { target: { id } } = e
    if (repLoading) {
      return
    }
    setRepPhoto({ variables: { photoId: parseInt(id), shopId } })
  }
  return (loading ? <Loading /> : <Container>
    {data?.seeCoffeeShopPhoto?.map((item, index) => <PhotoContainer key={index}>
      <Photo src={item.url} />
      <RepBtn onClick={onClicRepBtn} id={item.id}>
        {item.rep ? "현재 대표 사진입니다." : "대표 사진으로 설정하기"}
      </RepBtn>
    </PhotoContainer>
    )}
  </Container>);
}

export default EditRepPhoto;