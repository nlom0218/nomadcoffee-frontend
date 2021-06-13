import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMsg from '../auth/ErrorMsg';
import CreateShopLayout from '../coffeeShop/CreateShopLayout';
import FormLayout from '../coffeeShop/FormLayout';
import { Input, InputName } from '../style';

const EDIT_AVATAR = gql`
  mutation editAvatar($avatarURL: Upload!) {
    editAvatar(avatarURL: $avatarURL) {
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

const UserAvatar = () => {
  const { register, formState: { errors } } = useForm({ mode: "onChange" })
  const [editAvatar, { loading }] = useMutation(EDIT_AVATAR, {
    onCompleted: () => {
      console.log("He");
      window.location.reload()
    }
  })
  const onChangePhoto = ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      editAvatar({
        variables: {
          avatarURL: file
        }
      })
    }
  }

  return (<CreateShopLayout>
    <FormLayout>
      <form>
        {loading ? <Loading>
          프로필 사진 업로드 중...
          </Loading> : <>
          <InputName>
            <FontAwesomeIcon icon={faCoffee} />
            <span>사용자의 프로필 사진을 바꿉니다.</span>
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

export default UserAvatar;