import { gql, useQuery } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import DelShop from '../components/coffeeShop/DelShop';
import EidtRepPhoto from '../components/coffeeShop/EditRepPhoto';
import EditShopBasic from '../components/coffeeShop/EditShopBasic';
import UploadShopPhoto from '../components/coffeeShop/UploadShopPhoto';
import Header from '../components/Header';
import Loading from '../components/Loading';

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
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px 0px 0px 60px;
`

const ListContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-right: 1px solid ${props => props.theme.fontColor};
  padding-right: 100px;
  margin-right: 100px;
`
const ListName = styled.div`
  :not(:last-child) {
    margin-bottom: 30px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 20px;
  }
  span {
    font-size: 24px;
    cursor: pointer;
  }
`

const EidtContainer = styled.div``


const EditShop = () => {
  const [type, setType] = useState("basic")
  const { id } = useParams()
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, { variables: { id: parseInt(id) } })
  return (loading ? <Loading /> : <>
    <Header />
    <BasicContainer>
      <BasicHomeTitle title={`Edit ${data?.seeCoffeeShop?.name}`} />
      <Container>
        <ListContainer>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setType("basic") }}>기본 정보 수정하기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setType("upload") }}>카페 사진 올리기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setType("setRep") }}>대표 사진 설정하기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setType("del") }}>카페 삭제하기</span>
          </ListName>
        </ListContainer>
        <EidtContainer>
          {type === "basic" && <EditShopBasic name={data?.seeCoffeeShop?.name} id={data?.seeCoffeeShop?.id} />}
          {type === "upload" && <UploadShopPhoto />}
          {type === "setRep" && <EidtRepPhoto />}
          {type === "del" && <DelShop />}
        </EidtContainer>
      </Container>
    </BasicContainer>
  </>);
}

export default EditShop;