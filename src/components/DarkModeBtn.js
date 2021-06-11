import { useReactiveVar } from '@apollo/client';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../apollo';

const Button = styled.span`
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`

const DarkModeBtn = () => {
  const darkMode = useReactiveVar(darkModeVar)

  const enable = () => enableDarkMode()
  const disable = () => disableDarkMode()

  return (<Button onClick={darkMode ? disable : enable}>
    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
  </Button>);
}

export default DarkModeBtn;