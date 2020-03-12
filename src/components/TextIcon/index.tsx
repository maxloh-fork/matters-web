import classNames from 'classnames'

import styles from './styles.css'

type TextIconColor =
  | 'black'
  | 'green'
  | 'gold'
  | 'grey'
  | 'grey-light'
  | 'grey-darker'
  | 'grey-dark'
  | 'white'
  | 'red'

interface TextIconProps {
  icon?: React.ReactNode

  color?: TextIconColor
  size?: 'xs' | 'sm' | 'md-s' | 'md' | 'xm' | 'lg'
  spacing?: 0 | 'xxxtight' | 'xxtight' | 'xtight' | 'tight' | 'base'
  weight?: 'light' | 'normal' | 'md' | 'semibold' | 'bold'

  textPlacement?: 'bottom' | 'left' | 'right'

  style?: React.CSSProperties
  className?: string
  truncateTxt?: boolean
}

/**
 * `<TextIcon>` component that combines text and `<Icon>` to render as left-right/top-bottom layout.
 *
 * Usage:
 *
 * ```jsx
 * <TextIcon
 *   icon={<Icon id={ICON_MAT_GOLD.id}
 *   viewBox={ICON_MAT_GOLD.viewBox}
 * >
 *  123
 * </TextIcon>} />
 * ```
 */

export const TextIcon: React.FC<TextIconProps> = ({
  icon,

  color,
  size = 'sm',
  spacing = 'xxtight',
  weight,

  textPlacement = 'right',
  truncateTxt = false,

  style,
  className,

  children
}) => {
  const textStyle = style && style.fontSize ? { fontSize: style.fontSize } : {}

  const textIconClasses = classNames({
    'text-icon': true,
    [color || '']: !!color,
    [`text-${textPlacement}`]: true,
    [`size-${size}`]: true,
    [spacing ? `spacing-${spacing}` : '']: !!spacing,
    [weight ? `weight-${weight}` : '']: !!weight,
    [className || '']: !!className,
    hasIcon: !!icon,
    'truncate-text': truncateTxt
  })

  if (textPlacement === 'left') {
    return (
      <span className={textIconClasses} style={style}>
        {children && (
          <span className="text" style={textStyle}>
            {children}
          </span>
        )}

        {icon}

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={textIconClasses} style={style}>
      {icon}

      {children && (
        <span className="text" style={textStyle}>
          {children}
        </span>
      )}

      <style jsx>{styles}</style>
    </span>
  )
}
