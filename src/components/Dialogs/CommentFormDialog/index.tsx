import { useState } from 'react'

import { Dialog } from '~/components'

import CommentForm, { CommentFormProps } from './CommentForm'

type CommentFormDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & Omit<CommentFormProps, 'closeDialog'>

const BaseCommentFormDialog = ({
  children,
  ...props
}: CommentFormDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  // FIXME: editor can't be focused with dialog on Android devices
  const focusEditor = () => {
    const $editor = document.querySelector('.ql-editor') as HTMLElement
    if ($editor) {
      $editor.focus()
    }
  }

  const onRest = () => {
    if (showDialog) {
      focusEditor()
    }
  }

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} onRest={onRest} fixedHeight>
        <CommentForm {...props} closeDialog={close} />
      </Dialog>
    </>
  )
}

export const CommentFormDialog = (props: CommentFormDialogProps) => (
  <Dialog.Lazy mounted={<BaseCommentFormDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
