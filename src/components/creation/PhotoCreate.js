import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import routes from '../../routes';
import ErrorMsg from '../auth/ErrorMsg';
import { Input, InputName } from '../style';

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

const PhotoCreate = ({ shopId }) => {
  const history = useHistory()
  const { register, formState: { errors }, } = useForm({
    mode: "onChange"
  })

  const [uploadCoffeeShopPhoto, { loading }] = useMutation(UPLOAD_COFFEE_SHOP_PHOTO, {
    onCompleted: (data) => {
      history.push(routes.HOME)
      window.location.reload()
    }
  })

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
  return (
    loading ? <Loading>
      카페 이미지 업로드 중...
    </Loading> :
      <React.Fragment>
        <InputName style={{ width: "90%" }}>
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
        <ErrorMsg msg={errors?.photo?.message} />
      </React.Fragment>
  );
}

export default PhotoCreate;