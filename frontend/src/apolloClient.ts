import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split
} from '@apollo/client'
import { createUploadLink} from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
import { loadDevMessages, logDevMessage } from '@apollo/client/dev'
import { useUserStore } from './stores/userStore'

