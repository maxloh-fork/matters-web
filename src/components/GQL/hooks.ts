import { OperationVariables, QueryResult } from '@apollo/react-common'
import {
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryTuple,
  useLazyQuery as baseUseLazyQuery,
  useMutation as baseUseMutation,
  useQuery as baseUseQuery,
} from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'

import { GQL_CONTEXT_PUBLIC_QUERY_KEY } from '~/common/enums'

import { mutationOnError } from './error'

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: (error) => mutationOnError(error),
    ...options,
  })

  return [mutate, result]
}

interface CustomQueryProps {
  publicQuery?: boolean
}

export const usePublicQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
  customQueryProps?: CustomQueryProps
): QueryResult<TData, TVariables> => {
  const publicQuery = customQueryProps?.publicQuery

  const result = baseUseQuery(query, {
    ...options,
    context: {
      [GQL_CONTEXT_PUBLIC_QUERY_KEY]:
        typeof publicQuery === 'boolean' ? publicQuery : true,
    },
  })

  return result
}

export const usePublicLazyQuery = <
  TData = any,
  TVariables = OperationVariables
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>,
  customQueryProps?: CustomQueryProps
): QueryTuple<TData, TVariables> => {
  const publicQuery = customQueryProps?.publicQuery

  const result = baseUseLazyQuery(query, {
    ...options,
    context: {
      [GQL_CONTEXT_PUBLIC_QUERY_KEY]:
        typeof publicQuery === 'boolean' ? publicQuery : true,
    },
  })

  return result
}
