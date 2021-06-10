import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormLayout from '../components/coffeeShop/FormLayout';
import { Button, Input } from '../components/style';
import routes from '../routes';

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $categories: String ) {
    createCoffeeShop(name: $name, categories: $categories) {
      ok
      info
      error
    }
  }
`

const UPLOAD_COFFEE_SHOP_PHOTO = gql`
  mutation uploadCoffeeShopPhoto($coffeeShopId: Int!, $photo: Upload!) {
    uploadCoffeeShopPhoto(coffeeShopId: $coffeeShopId, photo: $photo) {
      ok
      error
    }
  }
`

const ShopLayout = styled.div`
  width: 600px;
  max-width: 600px;
`

const Title = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`

const CreateForm = styled(FormLayout)`
  width: 100%;
`

const InputName = styled.div`
  width: 100%;
  color: ${props => props.theme.bgColor};
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 18px;
  svg {
    margin-right: 10px;
  }
`

const CreateShop = () => {
  const history = useHistory()
  const [photo, setPhoto] = useState(false)
  const [shopId, setShopId] = useState(null)
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
  const [uploadCoffeeShopPhoto, { loading: photoLoading }] = useMutation(UPLOAD_COFFEE_SHOP_PHOTO, {
    onCompleted: (data) => history.push(routes.HOME)
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

  const onChangePhoto = ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      uploadCoffeeShopPhoto({
        variables: {
          coffeeShopId: shopId,
          photo: file
        }
      })
    }
  }

  return (<ShopLayout>
    <Title>카페 만들기</Title>
    <CreateForm>
      {!photo ? <form onSubmit={handleSubmit(onSubmitValid)}>
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
        <Button type="submit" value="카페 대표사진 설정하기" />
      </form> :

        <React.Fragment><InputName style={{ width: "90%" }}>
          <FontAwesomeIcon icon={faCoffee} />
        카페의 사진을 올려주세요.
        </InputName>
          <Input style={{ width: "90%" }}
            {...register("photo", {
              required: "필수사항 입니다."
            })}
            type="file"
            onChange={onChangePhoto}
          />
          <ErrorMsg msg={errors?.photo?.message} /> </React.Fragment>

      }
    </CreateForm>
  </ShopLayout>);
}

export default CreateShop;