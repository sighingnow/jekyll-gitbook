const GITHUB = 'GitHub'
const GITHUB_LINK = 'https://github.com/cruz-lucas'
const MAIL = 'Mail'
const MAIL_ADDRESS = 'lucas@lucas-cruz.com'
const LINKEDIN = 'LinkedIn'
const LINKEDIN_LINK = 'https://linkedin.com/in/lucasdearaujocruz'
const TWITTER = 'Twitter'
const TWITTER_LINK = 'https://twitter.com/_Lucas_Cruz'


interface ContactMeData {
    readonly github: string
    readonly linkedin: string
    readonly mail: string
    readonly twitter: string
    readonly githubLink: string
    readonly linkedinLink: string
    readonly mailAddress: string
    readonly twitterLink: string
  }


export const contactMeData: ContactMeData = {
    github: GITHUB,
    githubLink: GITHUB_LINK,
    mail: MAIL,
    mailAddress: MAIL_ADDRESS,
    twitter: TWITTER,
    twitterLink: TWITTER_LINK,
    linkedin: LINKEDIN,
    linkedinLink: LINKEDIN_LINK
  }