export const code = (value: string) => {
  if (!value) {
    return ''
  }

  if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
    const path = new URL(value).pathname
    return `https://jsfiddle.net${path}${
      path.endsWith('/') ? '' : '/'
    }embedded/`
  }
  return ''
}

export const video = (value: string) => {
  if (!value) {
    return ''
  }

  let id: string | null
  if (value.match('(http(s)?://)?(www.)?youtube|youtu.be')) {
    id = value.match('embed')
      ? value.split(/embed\//)[1].split('"')[0]
      : value.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]
    return 'https://www.youtube.com/embed/' + id + '?rel=0'
  } else if (value.match(/vimeo.com\/(\d+)/)) {
    const matches = value.match(/vimeo.com\/(\d+)/)
    id = matches && matches[1]
    return 'http://player.vimeo.com/video/' + id
  } else if (value.match(/id_(.*)\.html/i)) {
    const matches = value.match(/id_(.*)\.html/i)
    id = matches && matches[1]
    return 'http://player.youku.com/embed/' + id
  }
  return ''
}