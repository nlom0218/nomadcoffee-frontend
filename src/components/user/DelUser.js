import { useMutation } from '@apollo/client';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { logOutUser } from '../../apollo';
import routes from '../../routes';

const Title = styled.span`
  width: 100%;
  font-size: 30px;
  color: tomato;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  svg {
    margin-right: 20px;
  }
`

const DelShopBtn = styled.div`
  margin-top: 30px;
  background-color: tomato;
  width: 150px;
  font-size: 20px;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  color: #FCFAF4;
  margin-left: 50px;
`

const Msg = styled.div`
  margin-top: 30px;
  color: tomato;
  margin-left: 50px;
  font-size: 30px;
`

const DEL_USER_MUTATION = gql`
  mutation delUser($id: Int!) {
    delUser(id: $id) {
      ok
      error
    }
  }
`

const DelUser = ({ id, username }) => {
  const [msg, setMsg] = useState(null)
  const history = useHistory()
  const onCompleted = (data) => {
    const { delUser: { error, ok } } = data
    if (!ok) {
      setMsg(error)
      return
    }
    history.push(routes.HOME)
    logOutUser()
  }
  const [delUser, { loading, data }] = useMutation(DEL_USER_MUTATION, {
    onCompleted
  })
  const onClickBtn = () => {
    if (loading) {
      return
    }
    delUser({
      variables: { id }
    })
  }
  return (<>
    <Title>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <span>계정을 삭제합니다. {username}의 모든 카페가 삭제되며 한 번 삭제된 계정은 복구할 수 없습니다.</span>
    </Title>
    <DelShopBtn onClick={onClickBtn}>영구 삭제하기</DelShopBtn>
    {msg && <Msg>{msg}</Msg>}
  </>);
}

export default DelUser;