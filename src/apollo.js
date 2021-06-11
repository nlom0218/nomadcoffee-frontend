import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client'

const TOKEN = "token"
const PAGE = "page"

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

export const pageVar = makeVar(parseInt(localStorage.getItem(PAGE)) || 1)
export const setPage = (page) => {
  pageVar(page)
  localStorage.setItem(PAGE, page)
}

const httpLink = createUploadLink({
  uri: process.env.NODE_ENV === "production"
    ? "https://khd-nomadcoffee-backend.herokuapp.com/graphql"
    : "http://localhost:4000/graphql",
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


