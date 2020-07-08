import {
  Button,
  DropdownDialog,
  IconEdit,
  IconMoreLarge,
  IconShare,
  Menu,
  ShareDialog,
  TagDialog,
  TextIcon,
  Translate,
} from '~/components'

import { TEXT } from '~/common/enums'

interface DropdownActionsProps {
  id: string
  content?: string
  description?: string
  canEdit: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openTagDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  id,
  content,
  description,
  canEdit,
  openShareDialog,
  openTagDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享標籤" zh_hans="分享标签" />
        </TextIcon>
      </Menu.Item>
      {canEdit && (
        <Menu.Item onClick={openTagDialog}>
          <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
            <Translate id="editTag" />
          </TextIcon>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          bgColor="green-lighter"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMoreLarge size="lg" color="green" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  return (
    <ShareDialog title={props.content}>
      {({ open: openShareDialog }) => (
        <TagDialog {...props}>
          {({ open: openTagDialog }) => (
            <BaseDropdownActions
              {...props}
              openShareDialog={openShareDialog}
              openTagDialog={openTagDialog}
            />
          )}
        </TagDialog>
      )}
    </ShareDialog>
  )
}

export default DropdownActions
