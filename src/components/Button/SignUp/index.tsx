import { useState } from 'react'

import { Button, Dialog, TextIcon, Translate } from '~/components'
import SignUpDialog from '~/components/SignUpDialog'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

const SignUpButton: React.FC<{ trackType: string }> = ({
  children,
  trackType
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      <Button
        size={[null, '2.25rem']}
        spacing={[0, 'loose']}
        bgColor="green"
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
            type: trackType
          })
          open()
        }}
      >
        <TextIcon color="white" weight="md">
          {children}
        </TextIcon>
      </Button>

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.register}
            zh_hans={TEXT.zh_hans.register}
          />
        }
        size="sm"
        isOpen={showDialog}
        onDismiss={close}
      >
        <SignUpDialog isOpen={showDialog} onDismiss={close} />
      </Dialog>
    </>
  )
}

export default SignUpButton
