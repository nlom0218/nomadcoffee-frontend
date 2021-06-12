import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { editVar, setEdit } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import DelPhoto from '../components/coffeeShop/DelPhoto';
import DelShop from '../components/coffeeShop/DelShop';
import EditRepPhoto from '../components/coffeeShop/EditRepPhoto';
import EditShopBasic from '../components/coffeeShop/EditShopBasic';
import UploadShopPhoto from '../components/coffeeShop/UploadShopPhoto';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';

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
    }
  }
`

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px 0px 0px 20px;
`

const ListContainer = styled.div`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-right: 1px solid ${props => props.theme.fontColor};
  /* padding-right: 100px; */
  margin-right: 80px;
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

const EidtContainer = styled.div`
`


const EditShop = () => {
  const editMode = useReactiveVar(editVar)
  const { id } = useParams()
  const { data, loading } = useQuery(SEE_COFFEE_SHOP, { variables: { id: parseInt(id) } })
  return (loading ? <Loading /> : <>
    <PageTitle title={`${data?.seeCoffeeShop?.name} Edit`} />
    <Header />
    <BasicContainer>
      <BasicHomeTitle title={`Edit ${data?.seeCoffeeShop?.name}`} />
      <Container>
        <ListContainer>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setEdit("basic") }}>카페 이름 수정하기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setEdit("upload") }}>카페 사진 올리기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setEdit("delPhoto") }}>카페 사진 삭제하기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setEdit("setRep") }}>대표 사진 설정하기</span>
          </ListName>
          <ListName>
            <FontAwesomeIcon icon={faCircle} />
            <span onClick={() => { setEdit("del") }}>카페 삭제하기</span>
          </ListName>
        </ListContainer>
        <EidtContainer>
          {editMode === "basic" && <EditShopBasic name={data?.seeCoffeeShop?.name} id={data?.seeCoffeeShop?.id} />}
          {editMode === "upload" && <UploadShopPhoto id={data?.seeCoffeeShop?.id} />}
          {editMode === "delPhoto" && <DelPhoto id={data?.seeCoffeeShop?.id} />}
          {editMode === "setRep" && <EditRepPhoto id={data?.seeCoffeeShop?.id} />}
          {editMode === "del" && <DelShop name={data?.seeCoffeeShop?.name} id={data?.seeCoffeeShop?.id} />}
        </EidtContainer>
      </Container>
    </BasicContainer>
  </>);
}

export default EditShop;