import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DraftDigest,
  EmptyDraft,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner
} from '~/components'
import { QueryError } from '~/components/GQL'

import { mergeConnections } from '~/common/utils'

import { MeDraftFeed } from './__generated__/MeDraftFeed'

const ME_DRAFTS_FEED = gql`
  query MeDraftFeed($after: String) {
    viewer {
      id
      drafts(input: { first: 10, after: $after })
        @connection(key: "viewerDrafts") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DraftDigestFeedDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Feed.fragments.draft}
`

const MeDrafts = () => {
  const { data, loading, error, fetchMore } = useQuery<MeDraftFeed>(
    ME_DRAFTS_FEED
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.drafts'
  const { edges, pageInfo } = data?.viewer?.drafts || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyDraft />
  }

  const loadMore = () =>
    fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <DraftDigest.Feed draft={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myDrafts" />}
      marginBottom={0}
    />

    <Head title={{ id: 'myDrafts' }} />

    <MeDrafts />
  </Layout>
)
