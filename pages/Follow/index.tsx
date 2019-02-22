import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Error, Footer, Spinner } from '~/components'
import FollowFeed from './FollowFeed'
import PickAuthors from './PickAuthors'

import { MeFollow } from './__generated__/MeFollow'

const ME_FOLLOW = gql`
  query MeFollow {
    viewer {
      id
      ...FolloweeCountViewer
    }
  }
  ${PickAuthors.fragments.followeeCount}
`

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Query query={ME_FOLLOW} notifyOnNetworkStatusChange>
        {({ data, loading, error }: QueryResult & { data: MeFollow }) => {
          if (error) {
            return <Error error={error} />
          }

          if (loading) {
            return <Spinner />
          }

          const followeeCount = _get(data, 'viewer.followees.totalCount', 0)

          if (followeeCount < 5) {
            return <PickAuthors viewer={data.viewer} />
          } else {
            return <FollowFeed />
          }
        }}
      </Query>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)
