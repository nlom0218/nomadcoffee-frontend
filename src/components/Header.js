import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar, logOutUser } from '../apollo';
import routes from "../routes"

const LoginLink = styled.div`
  cursor: pointer;
`

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const history = useHistory()
  const onClickLink = () => {
    if (isLoggedIn) {
      logOutUser()
    } else {
      history.push(routes.LOGIN)
    }
  }
  return (<div>
    <LoginLink onClick={onClickLink}>{isLoggedIn ? "로그아웃" : "로그인"}</LoginLink>
  </div>);
}

export default Header;