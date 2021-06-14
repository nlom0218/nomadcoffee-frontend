import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormLayout from '../coffeeShop/FormLayout';
import CreateShopLayout from '../coffeeShop/CreateShopLayout';
import { Button, Input, InputName } from '../style';
import ErrorMsg from '../auth/ErrorMsg';
import styled from 'styled-components';

const EDIT_PROFILE = gql`
  mutation editProfile($username: String, $email: String, $name: String, $githubUsername: String, $password: String) {
    editProfile(username: $username, email: $email, name: $name, githubUsername: $githubUsername, password: $password) {
      ok
      error
    }
  }
`

const EditInfoMsg = styled.span`  
  color: ${props => props.theme.bgColor};
  font-size: 24px;
  margin-bottom: 20px;
`

const EditUser = ({ preData }) => {
  const { seeProfile: { username, email, name, githubUsername } } = preData
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({ mode: "onChange" })
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE, {
    onCompleted: (data) => {
      const { editProfile: { ok } } = data
      if (ok) {
        window.location.reload()
      }
    }
  })
  const onValid = (data) => {
    console.log(data);
    if (loading) {
      return
    }
    editProfile({
      variables: {
        ...data
      }
    })
  }
  return (<CreateShopLayout>
    <FormLayout>
      <EditInfoMsg>원하는 수정 내용을 입력 후 수정하기를 눌러주세요.</EditInfoMsg>
      <form onSubmit={handleSubmit(onValid)}>
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>사용자의 대표 이름을 수정합니다.</span>
        </InputName>
        <Input
          {...register("username", {
            minLength: {
              value: 5,
              message: "5자 이상 입력해 주세요."
            }
          })}
          type="text" autoComplete="off" placeholder={username} />
        <ErrorMsg msg={errors?.username?.message} />
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>사용자의 이메일을 수정합니다.</span>
        </InputName>
        <Input
          {...register("email")}
          type="text" autoComplete="off" placeholder={email} />
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>사용자의 이름을 수정합니다.</span>
        </InputName>
        <Input
          {...register("name")}
          type="text" autoComplete="off" placeholder={name} />
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>사용자의 깃헙 이름을 수정합니다.</span>
        </InputName>
        <Input
          {...register("githubUsername")}
          type="text" autoComplete="off" placeholder={githubUsername} />
        <InputName>
          <FontAwesomeIcon icon={faCoffee} />
          <span>사용자의 비밀번호를 수정합니다.</span>
        </InputName>
        <Input
          {...register("password")}
          type="password" autoComplete="off" />
        <Button type="submit" value="수정하기" disabled={!isValid} />
      </form>
    </FormLayout>
  </CreateShopLayout>);
}

export default EditUser;