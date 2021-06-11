import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMsg from '../auth/ErrorMsg';
import { Button, Input, InputName } from '../style';

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $categories: String ) {
    createCoffeeShop(name: $name, categories: $categories) {
      ok
      info
      error
    }
  }
`

const InfoCreate = ({ setPhoto, setShopId }) => {
  const { register, handleSubmit, formState: { errors, isValid }, } = useForm({
    mode: "onChange"
  })

  const onCompleted = (data) => {
    setShopId(data.createCoffeeShop.info);
    setPhoto(true)
  }

  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
    onCompleted
  })


  const onSubmitValid = (data) => {
    const { name, categories } = data
    if (loading) {
      return
    }
    createCoffeeShop({
      variables: {
        name,
        categories
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <InputName>
        <FontAwesomeIcon icon={faCoffee} />
        카페 이름을 입력해 주세요.
      </InputName>
      <Input
        {...register("name", {
          required: "필수사항 입니다."
        })}
        type="text" placeholder="coffee shop name" autoComplete="off" />
      <ErrorMsg msg={errors?.name?.message} />
      <InputName>
        <FontAwesomeIcon icon={faCoffee} />
        카페의 카테고리를 입력해 주세요.(,로 구분됩니다.)
      </InputName>
      <Input
        {...register("categories")}
        type="text" placeholder="coffee categories" autoComplete="off" />
      <Button type="submit" value="카페 대표사진 설정하기" disabled={!isValid} />
    </form>);
}

export default InfoCreate;