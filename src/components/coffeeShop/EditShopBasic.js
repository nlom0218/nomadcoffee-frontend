import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, InputName } from '../style';
import CreateShopLayout from './CreateShopLayout';
import FormLayout from './FormLayout';

const EDIT_COFFEE_SHOP = gql`
  mutation editCoffeeShop($coffeeShopId: Int!, $name: String) {
    editCoffeeShop(coffeeShopId: $coffeeShopId, name: $name) {
      ok
      error
    }
  }
`

const EidtShopBasic = ({ name, id }) => {
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { editCoffeeShop: { ok } } = data
    if (ok) {
      window.location.reload()
    }
  }
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEE_SHOP, { onCompleted })
  const onSubmitValid = (data) => {
    const { name } = data
    if (loading) {
      return
    }
    editCoffeeShop({
      variables: { coffeeShopId: id, name }
    })
  }
  return (<CreateShopLayout>
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>카페의 이름을 수정합니다.</span>
        </InputName>
        <Input
          {...register("name", {
            required: "카페 이름을 입력해주세요."
          })}
          type="text" placeholder={name} autoComplete="off" />
        <Button type="submit" value="수정하기" disabled={!isValid} />
      </form>
    </FormLayout>
  </CreateShopLayout>);
}

export default EidtShopBasic;