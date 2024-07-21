import BrowserOnly from '@docusaurus/BrowserOnly'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {
  contactMeData,
} from '@site/src/data'
import { isMobile, setClipBoardText } from '@site/src/utils'
import profile from '@site/static/img/profile.png'
import github from '@site/static/img/icons/social/github.png'
import mail from '@site/static/img/icons/social/mail.png'
import linkedin from '@site/static/img/icons/social/linkedin.png'
import twitter from '@site/static/img/icons/social/twitter.png'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React, { useState } from 'react'

import styles from './styles.module.css'

type HomepageHeaderProps = {
  isMobileDevice: boolean
}

type ContactMeBtnProps = {
  readonly title?: string
  readonly src: any
  link?: string
  isCopyBtn?: boolean
  copySuccess?: () => void
}

export default function Home(): JSX.Element {
  return (
    <BrowserOnly fallback={undefined}>
      {() => {
        const isMobileDevice: boolean = isMobile()
        return (
          <Layout
            title="Home"
            description="Description will go into a meta tag in <head />"
          >
            <HomepageHeader isMobileDevice={isMobileDevice} />
          </Layout>
        )
      }}
    </BrowserOnly>
  )
}

function HomepageHeader({ isMobileDevice }: HomepageHeaderProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const [show, setShow] = useState<boolean>(false)

  const copySuccess = (): void => {
    setShow(true)
    if (!show) {
      setTimeout(() => {
        setShow(false)
      }, 4000)
    }
  }

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx(styles.heroTextContainer)}>
        {!isMobileDevice && (
          <div className={styles.avatarArea}>
            <Link
              className={clsx(styles.avatarArea)}
              to="/about"
            ><img
              src={profile}
              alt="Lucas"
              />
            </Link>
              
          </div>
        )}
        <div className={styles.navLinkIconArea}>
          <ContactMeBtn
            title={contactMeData.github}
            src={github}
            link={contactMeData.githubLink}
          />
          <ContactMeBtn
            title={contactMeData.linkedin}
            src={linkedin}
            link={contactMeData.linkedinLink}
          />
          <ContactMeBtn
            title={contactMeData.mail}
            src={mail}
            link={contactMeData.mailAddress}
            isCopyBtn
            copySuccess={copySuccess}
          />
          <ContactMeBtn
            title={contactMeData.twitter}
            src={twitter}
            link={contactMeData.twitterLink}
          />
        </div>
      </div>
    </header>
  )
}

function ContactMeBtn({
  title,
  src,
  link,
  isCopyBtn = false,
  copySuccess
}: ContactMeBtnProps): JSX.Element {
  if (isCopyBtn && typeof link !== 'undefined') {
    return (
      <div
        className={styles.navLink}
        onClick={() => {
          setClipBoardText(link)
          if (copySuccess) {
            copySuccess()
          }
        }}
      >
        <div className={styles.imageWrapper}>
          <img
            src={src}
            alt={title}
            title={title}
          />
        </div>
      </div>
    )
  }
  return (
    <Link
      className={styles.navLink}
      to={link}
      href="_blank"
    >
      <div className={styles.imageWrapper}>
        <img
          src={src}
          alt={title}
          title={title}
        />
      </div>
    </Link>
  )
}
