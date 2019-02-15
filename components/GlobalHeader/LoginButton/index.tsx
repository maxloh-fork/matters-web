import { Button } from '~/components'

import { PATHS } from '~/common/enums'

export default () => (
  <Button
    is="link"
    size="large"
    bgColor="transparent"
    href={PATHS.AUTH_LOGIN.fs}
    as={PATHS.AUTH_LOGIN.url}
    spacing="default"
    className="u-link-green"
  >
    登入
  </Button>
)