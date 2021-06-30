import { useQuery } from '@apollo/client';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

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

const RemoveContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const Category = styled.div`
  display: flex;
  margin-bottom: 50px;
  font-size: 24px;
`

const CategoryName = styled.label`
  margin-right: 10px;
`

const RemoveBtn = styled.input`
`

const EditCategory = ({ id }) => {
  const { data, loading } = useQuery(SEE_CATEGORIES_QUERY, {
    variables: {
      shopId: id
    }
  })
  return (loading ? <Loading /> : <Container>
    <Text>
      <AddText>카데고리 추가하기</AddText>
      <RemoveText>카테고리 삭제하기</RemoveText>
    </Text>
    <RemoveContainer>
      {data?.seeCategories.map((item, index) => <Category key={index}>
        <CategoryName for={item.name}>{item.name}</CategoryName>
        <RemoveBtn type="text" name="category" value={item.name} checked={false} />
      </Category>)}
    </RemoveContainer>
  </Container>
  );
}

export default EditCategory;