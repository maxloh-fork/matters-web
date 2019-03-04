import classNames from 'classnames'
import { FC, useContext, useState } from 'react'

import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'
import { Title } from '~/components/Title'

import { translate } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

/**
 * This component is for password reset modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.PasswordModal purpose={'forget'} close={close} />
 * ```
 *
 */

interface Props {
  close: () => {}
  purpose: 'forget' | 'change'
}

const PasswordModal: FC<Props> = ({ close, purpose }) => {
  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState('request')

  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      title:
        purpose === 'forget'
          ? translate({ zh_hant: '忘記密碼', zh_hans: '忘记密码', lang })
          : translate({ zh_hant: '修改密碼', zh_hans: '修改密码', lang }),
      prev: 'login',
      next: 'reset'
    },
    reset: {
      title:
        purpose === 'forget'
          ? translate({ zh_hant: '重置密碼', zh_hans: '重置密码', lang })
          : translate({ zh_hant: '修改密碼', zh_hans: '修改密码', lang }),
      prev: 'request',
      next: 'complete'
    },
    complete: {
      title:
        purpose === 'forget'
          ? translate({
              zh_hant: '密碼重置成功',
              zh_hans: '密码重置成功',
              lang
            })
          : translate({
              zh_hant: '密碼修改成功',
              zh_hans: '密码修改成功',
              lang
            })
    }
  })

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData(prev => {
      return {
        ...prev,
        request: {
          ...prev.request,
          email,
          codeId
        }
      }
    })
    setStep('reset')
  }

  const backPreviousStep = (event: any) => {
    event.stopPropagation()
    setStep('request')
  }

  const Header = ({ title }: { title: string }) => (
    <>
      <div className="header">
        <Title type="modal">{title}</Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {purpose === 'forget'
            ? translate({
                zh_hant: '密碼重置成功',
                zh_hans: '密码重置成功',
                lang
              })
            : translate({
                zh_hant: '密碼修改成功',
                zh_hans: '密码修改成功',
                lang
              })}
        </div>
        {purpose === 'forget' && (
          <div className="hint">
            {translate({
              zh_hant: '請使用新的密碼重新登入',
              zh_hans: '请使用新的密码重新登入',
              lang
            })}
            。
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <Header title={data[step].title} />
      <div className="container">
        <div className={contentClass}>
          {step === 'request' && (
            <PasswordChangeRequestForm
              defaultEmail={data.request.email}
              purpose={purpose}
              container="modal"
              submitCallback={requestCodeCallback}
            />
          )}
          {step === 'reset' && (
            <PasswordChangeConfirmForm
              codeId={data.request.codeId}
              container="modal"
              backPreviousStep={backPreviousStep}
              submitCallback={() => setStep('complete')}
            />
          )}
          {step === 'complete' && <Complete />}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default PasswordModal