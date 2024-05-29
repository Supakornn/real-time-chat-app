import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split
} from '@apollo/client'
import {WebSocketLink} from "@apollo/client/link/ws"
import { createUploadLink} from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
import { loadDevMessages, logDevMessage } from '@apollo/client/dev'
import { useUserStore } from './stores/userStore'


async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
      mutation RefreshToken {
        refreshToken
      }
      `,
    }) 
    const newAccessToken = data?.refreshToken
    if (!newAccessToken) {
      throw new Error("New access token not received.")
    }
    return `Bearer ${newAccessToken}`
  } catch (err) {
    throw new Error("Error getting new access token.")
  }
}

let retryCount = 0
const maxRetry = 3

const wsLink = new WebSocketLink({
  url: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  }
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {

  for (const err of graphQLErrors) {
    if (
      err.extensions.code === "UNAUTHENTICATED" && 
      retryCount < maxRetry
    ) {
      retryCount++ 
      return new Observable((observer) => {
        refreshToken(client)
          .then((token) => {
          console.log("token", token);
          operation.setContext((previousContext: any) => ({
              headers: {
              ...previousContext.headers,
                authorization: token,
            },
          }))
            const forward$ = forward(operation)
            forward$.subscribe(observer)
          })
          .catch((error) => observer.error(error))
          
      })
    }
  }
})