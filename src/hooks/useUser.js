import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logOutUser } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
    }
  }
`


function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar)
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken
  })
  useEffect(() => {
    if (data?.me === null) {
      logOutUser();
    }
  }, [data]);
  return data?.me
}

export default useUser