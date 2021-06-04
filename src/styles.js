import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const ligthTheme = {
  fontColor: "#242A2D",
  bgColor: "#FFFFFF"
}
export const darkTheme = {
  fontColor: "#FFFFFF",
  bgColor: "#242A2D"
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor}
  }
`