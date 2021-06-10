import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logInUser } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormLayout from '../components/auth/FormLayout';
import MsgContainer from '../components/auth/MsgContainer';
import PageTitle from '../components/PageTitle';
import { Button, Input } from '../components/style';
import routes from '../routes';

const LoginMsg = styled.span`
  margin-bottom: 5px;
`

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`

const Login = () => {
  const location = useLocation()
  const history = useHistory()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || ""
    }
  })
  const onCompleted = (data) => {
    const { login: { ok, token, error } } = data
    if (!ok) {
      return
    }
    if (token) {
      console.log(token);
      logInUser(token)
      history.push(routes.HOME)
    }
  }
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  })
  const onSubmitValid = (data) => {
    if (loading) {
      return
    }
    const { username, password } = data
    login({
      variables: { username, password }
    })
  }

  return (<AuthLayout>
    <PageTitle title="로그인" />
    <LoginMsg>
      {location?.state?.message ? location?.state?.message : null}
    </LoginMsg>
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("username", {
            required: "유저이름을 입력해 주세요.",
            minLength: {
              value: 5,
              message: "5자 이상 입력해 주세요."
            }
          })}
          type="text" placeholder="Username" autoComplete="off" />
        <ErrorMsg msg={errors?.username?.message} />
        <Input
          {...register("password", {
            required: "비밀번호를 입력해 주세요."
          })}
          type="password" placeholder="Password" autoComplete="off" />
        <ErrorMsg msg={errors?.password?.message} />
        <Button
          type="submit" value={loading ? "loading..." : "로그인"} disabled={!isValid} />
      </form>
    </FormLayout>
    <MsgContainer msg="계정이 없으신가요?" link={routes.SIGNUP} linkText="가입하기" />
    <MsgContainer msg="손님이신가요?" link={routes.HOME} linkText="홈으로" />
  </AuthLayout>);
}

export default Login;