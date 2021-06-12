import { useMutation } from '@apollo/client';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import routes from '../../routes';

const Container = styled.div``

const Title = styled.span`
  width: 100%;
  font-size: 30px;
  color: tomato;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  svg {
    margin-right: 20px;
  }
`

const DelShopBtn = styled.div`
  margin-top: 30px;
  background-color: tomato;
  width: 150px;
  font-size: 20px;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  color: #FCFAF4;
  margin-left: 50px;
`

const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($shopId: Int!) {
    deleteCoffeeShop(shopId: $shopId) {
      ok
      error
    }
  }
`

const DelShop = ({ name, id }) => {
  const history = useHistory()
  const [deleteCoffeeShop, { loading }] = useMutation(DELETE_COFFEE_SHOP, {
    onCompleted: () => {
      history.push(routes.HOME)
      window.location.reload()
    }
  })
  const onClickDelShop = () => {
    if (loading) {
      return
    }
    deleteCoffeeShop({ variables: { shopId: id } })
  }

  return (<Container>
    <Title>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <span>{name}을 삭제합니다. 한 번 삭제된 카페는 복구되지 않습니다.</span>
    </Title>
    <DelShopBtn onClick={onClickDelShop}>영구 삭제하기</DelShopBtn>
  </Container>);
}


export default DelShop;