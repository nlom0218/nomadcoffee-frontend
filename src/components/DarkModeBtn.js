import { useReactiveVar } from '@apollo/client';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { darkModeVar } from '../apollo';

const Button = styled.span`
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`

const DarkModeBtn = () => {
  const darkMode = useReactiveVar(darkModeVar)

  const enableDarkMode = () => darkModeVar(true)
  const disableDarkMode = () => darkModeVar(false)

  return (<Button onClick={darkMode ? disableDarkMode : enableDarkMode}>
    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
  </Button>);
}

export default DarkModeBtn;