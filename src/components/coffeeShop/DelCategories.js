import { useMutation } from '@apollo/client';
import { faCheckSquare, faSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';

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

const CategoryName = styled.div`
  margin-right: 10px;
`

const CheckBtn = styled.div`
  cursor: pointer;
`

const RemoveBtn = styled.div`
  font-size: 24px;
  cursor: pointer;
`

const REMOVE_CATEGORY_MUTATION = gql`
  mutation removeCategory($categories: String!, $shopId: Int!) {
    removeCategory(categories: $categories, shopId: $shopId) {
      ok
      error
    }
  }
`

const DelCategories = ({ data, shopId }) => {
  const [removeCategories, setRemoveCategories] = useState([])
  const onCompleted = (data) => {
    const { removeCategory: { ok } } = data
    if (ok) {
      window.location.reload()
    }
  }
  const [removeCategory, { loading }] = useMutation(REMOVE_CATEGORY_MUTATION, {
    onCompleted
  })
  const onCLickCheckBtn = (name) => {
    if (removeCategories.includes(name)) {
      const removeArr = removeCategories.filter(item => item !== name)
      setRemoveCategories(removeArr)
    } else {
      const removeArr = [...removeCategories, name]
      setRemoveCategories(removeArr)
    }
  }
  const onClickRemoveBtn = () => {
    if (!loading) {
      const categories = removeCategories.join()
      removeCategory({
        variables: { categories, shopId }
      })
    }
  }
  return (<RemoveContainer>
    {data?.seeCategories.map((item, index) => <Category key={index}>
      <CategoryName>{item.name}</CategoryName>
      <CheckBtn>
        <FontAwesomeIcon
          icon={removeCategories.includes(item.name) ? faCheckSquare : faSquare}
          onClick={() => onCLickCheckBtn(item.name)} />
      </CheckBtn>
    </Category>)}
    <RemoveBtn>
      <FontAwesomeIcon icon={faTrashAlt} onClick={onClickRemoveBtn} />
    </RemoveBtn>
  </RemoveContainer>);
}

export default DelCategories;