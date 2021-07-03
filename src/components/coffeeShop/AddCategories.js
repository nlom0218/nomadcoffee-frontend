import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, InputName } from '../style';
import CreateShopLayout from './CreateShopLayout';
import FormLayout from './FormLayout';

const ADD_CATEGORIES_MUTATION = gql`
  mutation addCategory($categories: String!, $shopId: Int!) {
    addCategory(categories: $categories, shopId: $shopId) {
      ok
      error
    }
  }
`

const AddCategories = ({ shopId }) => {
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { addCategory: { ok } } = data
    if (ok) {
      window.location.reload()
    }
  }
  const [addCategory, { loading }] = useMutation(ADD_CATEGORIES_MUTATION, {
    onCompleted
  })
  const onSubmitValid = (data) => {
    const { categories } = data
    if (loading) {
      return
    }
    addCategory({
      variables: {
        shopId,
        categories
      }
    })
  }
  return (
    <CreateShopLayout>
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputName>
            <FontAwesomeIcon icon={faCoffee} />
            추가할 카테고리를 입력해주세요.(,로 구분 됩니다.)
          </InputName>
          <Input
            {...register("categories")}
            type="text" placeholder="coffee categories" autoComplete="off"
          />
          <Button type="submit" value="추가하기" disabled={!isValid} />
        </form>
      </FormLayout>
    </CreateShopLayout>
  );
}

export default AddCategories;