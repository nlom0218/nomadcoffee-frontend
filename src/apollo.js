import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client'

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

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphQL"
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN) || ""
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


