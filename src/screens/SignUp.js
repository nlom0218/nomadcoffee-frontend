import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormLayout from '../components/auth/FormLayout';
import MsgContainer from '../components/auth/MsgContainer';
import PageTitle from '../components/PageTitle';
import { Button, Input } from '../components/style';
import routes from '../routes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`

const SignUp = () => {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { createAccount: { ok, error } } = data
    const { username, password } = getValues()
    if (!ok) {
      console.log(error);
      return
    }
    history.push(routes.LOGIN, { username, password, message: "계정이 생성되었습니다." })
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  })
  const onSubmitValid = (data) => {
    createAccount({
      variables: { ...data }
    })
  }
  return (<AuthLayout>
    <PageTitle title="가입하기" />
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
          {...register("email", {
            required: "이메일을 입력해 주세요.",

          })}
          type="text" placeholder="Email" autoComplete="off" />
        <ErrorMsg msg={errors?.email?.message} />
        <Input
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
          })}
          type="password" placeholder="Password" autoComplete="off" />
        <ErrorMsg msg={errors?.password?.message} />
        <Button type="submit" value={loading ? "loading..." : "가입"} disabled={!isValid} />
      </form>
    </FormLayout>
    <MsgContainer msg="계정이 있으신가요?" link={routes.LOGIN} linkText="로그인" />
  </AuthLayout>);
}

export default SignUp;