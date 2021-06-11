import { useReactiveVar } from '@apollo/client';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar, logOutUser, setPage } from '../apollo';
import useUser from '../hooks/useUser';
import routes from "../routes"
import DarkModeBtn from './DarkModeBtn';

const Contanier = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  margin-bottom: 60px;
`

const SHeader = styled.header`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AuthLink = styled.div`
  display: flex;
  font-size: 16px;
`

const LoginLink = styled.div`
  cursor: pointer;
`

const Nav = styled.div`
  a {
    margin-right: 20px;
    color: ${props => props.theme.fontColor};
  }
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
  const user = useUser()
  return (<Contanier>
    <SHeader>
      <DarkModeBtn />
      <AuthLink>
        {isLoggedIn ?
          <Nav>
            <Link to={routes.HOME} onClick={() => setPage(1)}><FontAwesomeIcon icon={faHome} /></Link>
            <Link to={`/${user?.username}`}><FontAwesomeIcon icon={faUser} /></Link>
          </Nav>
          : null}
        <LoginLink onClick={onClickLink}>{isLoggedIn ? "로그아웃" : "로그인"}</LoginLink>
      </AuthLink>
    </SHeader>
  </Contanier>);
}

export default Header;