import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMsg from '../auth/ErrorMsg';
import { Input, InputName } from '../style';
import CreateShopLayout from './CreateShopLayout';
import FormLayout from './FormLayout';

const UPLOAD_COFFEE_SHOP_PHOTO = gql`
  mutation uploadCoffeeShopPhoto($coffeeShopId: Int!, $photo: Upload!) {
    uploadCoffeeShopPhoto(coffeeShopId: $coffeeShopId, photo: $photo) {
      ok
      error
    }
  }
`

const Loading = styled.div`
font-size: 24px;
font-weight: 600;
color: ${props => props.theme.bgColor};
`

const UploadShopPhoto = ({ id }) => {
  const { register, formState: { errors } } = useForm({
    mode: "onChange"
  })

  const [uploadCoffeeShopPhoto, { loading }] = useMutation(UPLOAD_COFFEE_SHOP_PHOTO, {
    onCompleted: () => {
      window.location.reload()
    }
  })

  const onChangePhoto = ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      uploadCoffeeShopPhoto({
        variables: {
          coffeeShopId: id,
          photo: file
        }
      })
    }
  }

  return (<CreateShopLayout>
    <FormLayout>
      <form >
        {loading ? <Loading>
          카페 이미지 업로드 중...
          </Loading> : <>
          <InputName>
            <FontAwesomeIcon icon={faCoffee} />
            <span>카페의 사진을 추가합니다.</span>
          </InputName>
          <Input
            {...register("photo", {
              required: "필수사항 입니다."
            })}
            type="file"
            onChange={onChangePhoto}
          />
          <ErrorMsg msg={errors?.photo?.message} /></>}
      </form>
    </FormLayout>
  </CreateShopLayout>);
}

export default UploadShopPhoto;