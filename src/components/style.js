import styled from "styled-components"

export const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.boxShadowColor};
  border: 2px solid ${props => props.theme.boxShadowColor};
  font-weight: 400;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.5;
  }
  :focus {
    border: 2px solid ${props => props.theme.bgColor};
  }
`

export const Button = styled.input`
  margin: 10px 0px;
  text-align: center;
  width: 100%;
  padding: 8px 0px;
  border-radius: 5px;
  background-color: ${props => props.theme.boxShadowColor};
  font-weight: 600;
  cursor: pointer;
  opacity: ${props => props.disabled ? "0.3" : "1"};
`

export const InputName = styled.div`
width: 100%;
color: ${props => props.theme.bgColor};
margin-top: 15px;
margin-bottom: 5px;
font-size: 18px;
svg {
  margin-right: 10px;
}
`