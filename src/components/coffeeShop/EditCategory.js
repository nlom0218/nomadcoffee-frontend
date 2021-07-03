import { useQuery } from '@apollo/client';
import { faCheckSquare, faSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import AddCategories from './AddCategories';
import DelCategories from './DelCategories';

const SEE_CATEGORIES_QUERY = gql`
  query seeCategories($shopId: Int!) {
    seeCategories(shopId: $shopId) {
      id
      name
    }
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  padding-bottom: 30px;
  font-size: 24px;
  border-bottom: 2px solid ${props => props.theme.boxColor};
  span {
    background-color: ${props => props.theme.boxColor};
    color: ${props => props.theme.bgColor};
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`

const RemoveText = styled.span`
`

const AddText = styled.span``

const EditCategory = ({ id }) => {
  const [mode, setMode] = useState("add")
  const { data, loading } = useQuery(SEE_CATEGORIES_QUERY, {
    variables: {
      shopId: id
    }
  })

  return (loading ? <Loading /> : <Container>
    <Text>
      <AddText onClick={() => setMode("add")}>카데고리 추가하기</AddText>
      <RemoveText onClick={() => setMode("remove")}>카테고리 삭제하기</RemoveText>
    </Text>
    {mode === "add" && <AddCategories shopId={id} />}
    {mode === "remove" && <DelCategories data={data} shopId={id} />}
  </Container>
  );
}

export default EditCategory;