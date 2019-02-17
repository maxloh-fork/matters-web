import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Title } from '~/components'

import Actions from '../Actions'
import { IcymiDigestArticle } from './__generated__/IcymiDigestArticle'
import { TopicsDigestArticle } from './__generated__/TopicsDigestArticle'
import styles from './styles.css'

const fragments = {
  icymi: gql`
    fragment IcymiDigestArticle on Article {
      id
      title
      slug
      cover
      author {
        userName
      }
      mediaHash
      ...SidebarDigestActionsArticle
    }
    ${Actions.fragments.sidebarDigest}
  `,
  topics: gql`
    fragment TopicsDigestArticle on Article {
      id
      title
      slug
      author {
        userName
      }
      mediaHash
      ...SidebarDigestActionsArticle
    }
    ${Actions.fragments.sidebarDigest}
  `
}

const FeedDigest = ({
  article
}: {
  article: IcymiDigestArticle | TopicsDigestArticle
}) => {
  const { cover, author, slug, mediaHash, title } = article
  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover
  })

  return (
    <section className="container">
      <div className={contentClasses}>
        <div className="left">
          <Link href={path.fs} as={path.url}>
            <a>
              <Title type="sidebar" is="h2">
                {title}
              </Title>
            </a>
          </Link>
          <Actions article={article} type="sidebar" />
        </div>

        {cover && (
          <Link href={path.fs} as={path.url}>
            <a>
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            </a>
          </Link>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest