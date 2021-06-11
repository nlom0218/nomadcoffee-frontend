import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const color = {
  lightBeige: "#fcfaf4",
  darkBrown: "#211700",
  brown: "#6A4424",
  lightBrown: "#C9A891"
}

export const lightTheme = {
  fontColor: color.darkBrown,
  bgColor: color.lightBeige,
  boxColor: color.brown,
  boxShadowColor: color.lightBrown,
  opacityBgColor: "rgb(252, 250, 244, 0.6)"
}
export const darkTheme = {
  fontColor: color.lightBeige,
  bgColor: color.darkBrown,
  boxColor: color.lightBrown,
  boxShadowColor: color.brown,
  opacityBgColor: "rgb(33, 22, 0, 0.6)"
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  body {
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor};
    font-size: 16px;
    width: 100%;

  }
  a {
    text-decoration: none;
  }
  #root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`