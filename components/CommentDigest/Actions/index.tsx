import gql from 'graphql-tag'
import { useState } from 'react'

import { DateTime, Icon } from '~/components'
import { Form } from '~/components/Form'

import ICON_COMMENT_SMALL from '~/static/icons/comment-small.svg?sprite'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsComment } from './__generated__/DigestActionsComment'
import DownvoteButton from './DownvoteButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

export interface CommentActionsControls {
  hasComment?: boolean
}
type ActionsProps = {
  comment: DigestActionsComment
} & CommentActionsControls

const fragments = {
  comment: gql`
    fragment DigestActionsComment on Comment {
      id
      createdAt
      ...UpvoteComment
      ...DownvoteComment
    }
    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
  `
}

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const Actions = ({ comment, hasComment }: ActionsProps) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <footer className="actions">
        <div className="left">
          <UpvoteButton comment={comment} />

          <IconDotDivider />
          <DownvoteButton comment={comment} />

          {hasComment && (
            <>
              <IconDotDivider />
              <button
                type="button"
                className={showForm ? 'active' : ''}
                onClick={() => {
                  setShowForm(!showForm)
                }}
              >
                <Icon
                  id={ICON_COMMENT_SMALL.id}
                  viewBox={ICON_COMMENT_SMALL.viewBox}
                  size="small"
                />
              </button>
            </>
          )}
        </div>

        <DateTime date={comment.createdAt} />
      </footer>

      {showForm && (
        <section className="comment-form">
          <Form.CommentForm articleId="" />
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

Actions.fragments = fragments

export default Actions
