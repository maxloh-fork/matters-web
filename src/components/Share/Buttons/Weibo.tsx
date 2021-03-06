import queryString from 'query-string'

import { TextIcon, Translate, withIcon } from '~/components'

import { dom } from '~/common/utils'

import { ReactComponent as IconShareWeiboCircle } from '@/public/static/icons/share-weibo-circle.svg'
import { ReactComponent as IconShareWeibo } from '@/public/static/icons/share-weibo.svg'

const Weibo = ({
  title,
  link,
  circle,
}: {
  title: string
  link: string
  circle?: boolean
}) => (
  <button
    type="button"
    onClick={() => {
      const cover = dom.$('meta[property="og:image"]').getAttribute('content')
      const shareUrl =
        'http://service.weibo.com/share/share.php?' +
        queryString.stringify({
          url: link,
          title,
          pic: cover,
        })
      return window.open(shareUrl, '分享到微博')
    }}
  >
    {circle && withIcon(IconShareWeiboCircle)({ size: 'xl-m' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareWeibo)({})} spacing="base">
        <Translate zh_hant="微博" zh_hans="微博" />
      </TextIcon>
    )}
  </button>
)

export default Weibo
