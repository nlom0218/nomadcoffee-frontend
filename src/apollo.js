import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))
export const logInUser = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
export const logOutUser = () => {
  localStorage.removeItem(TOKEN)
  isLoggedInVar(false)
}

export const darkModeVar = makeVar(false)


export const client = new ApolloClient({
  uri: "https://khd-nomadcoffee-backend.herokuapp.com/graphql",
  cache: new InMemoryCache
})

