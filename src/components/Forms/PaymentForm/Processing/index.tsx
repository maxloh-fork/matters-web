import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { Dialog, Icon, Spinner, Translate } from '~/components'

import { ViewerTxState } from './__generated__/ViewerTxState'

interface Props {
  txId: string
  nextStep: () => void
  windowRef?: Window
}

const VIEWER_TX_STATE = gql`
  query ViewerTxState($id: ID!) {
    viewer {
      id
      wallet {
        balance {
          HKD
        }
        transactions(input: { id: $id }) {
          edges {
            node {
              id
              state
            }
          }
        }
      }
    }
  }
`

const Processing: React.FC<Props> = ({ txId, nextStep, windowRef }) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerTxState>(VIEWER_TX_STATE, {
    variables: { id: txId },
    pollInterval: polling ? 1000 : undefined,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser,
  })
  const txState = _get(data, 'viewer.wallet.transactions.edges.0.node.state')

  if (txState === 'succeeded') {
    nextStep()

    if (windowRef) {
      setTimeout(() => {
        windowRef.close()
      }, 5000)
    }

    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Dialog.Message>
      {error ? (
        <>
          <h3>
            <Icon.EmptyWarning color="grey-light" size="xl" />
          </h3>

          <p>
            <Translate id="NETWORK_ERROR" />
          </p>
        </>
      ) : (
        <Spinner />
      )}
    </Dialog.Message>
  )
}

export default Processing
