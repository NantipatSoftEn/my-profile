import type { Site, SocialObjects } from './types'

export const SITE: Site = {
    website: 'https://www.codegeassmasterzeronebreakoutr1r2.codes', // replace this with your deployed domain
    author: 'NantipatSoftEn',
    profile: '',
    desc: 'share knowledge and experience',
    title: 'NantipatSoftEn',
    ogImage: '/assets/orochimaru15.png',
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 3,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
}

export const LOCALE = {
    lang: 'en', // html lang code. Set this empty and default will be "en"
    langTag: ['en-EN'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const

export const LOGO_IMAGE = {
    enable: true,
    svg: false,
    width: 300,
    height: 50,
}

export const SOCIALS: SocialObjects = [
    {
        name: 'Github',
        href: 'https://github.com/NantipatSoftEn',
        linkTitle: ` ${SITE.title} on Github`,
        active: true,
    },
    {
        name: 'Facebook',
        href: 'https://ghttps://www.facebook.com/codegeassmasterzeronebreakout',
        linkTitle: `${SITE.title} on Facebook`,
        active: true,
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/NantipatSoftEn',
        linkTitle: `${SITE.title} on Instagram`,
        active: true,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nantipat-tul/',
        linkTitle: `${SITE.title} on LinkedIn`,
        active: true,
    },
    {
        name: 'Mail',
        href: 'mailto:nantipatsoften.777@gmail.com',
        linkTitle: `Send an email to ${SITE.title}`,
        active: true,
    },
    {
        name: 'Medium',
        href: 'https://medium.com/@nantipatsoften',
        linkTitle: `${SITE.title} on Medium`,
        active: true,
    },
    {
        name: 'DEV',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Twitch`,
        active: true,
    },
    {
        name: 'BeeCrowd',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on BeeCrowd`,
        active: true,
    },
    {
        name: 'LeetCode',
        href: 'https://leetcode.com/u/NantipatSoftEn/',
        linkTitle: `${SITE.title} on LeetCode`,
        active: true,
    },
    {
        name: 'Bible',
        href: 'https://codegeassmasterzeronebreakoutr1r2.codes/myword',
        linkTitle: `${SITE.title} on Bible`,
        active: true,
    },
    // {
    //     name: 'WebRing',
    //     href: 'https://codegeassmasterzeronebreakoutr1r2.codes/myword',
    //     linkTitle: `${SITE.title} on WebRing`,
    //     active: true,
    // },
    {
        name: 'Pinterest',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Pinterest`,
        active: false,
    },
    {
        name: 'TikTok',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on TikTok`,
        active: false,
    },
    // {
    //     name: 'CodePen',
    //     href: 'https://codepen.io/keymasterviriya1150',
    //     linkTitle: `${SITE.title} on CodePen`,
    //     active: true,
    // },
    {
        name: 'Discord',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Discord`,
        active: false,
    },
    {
        name: 'GitLab',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on GitLab`,
        active: false,
    },
    {
        name: 'Reddit',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Reddit`,
        active: false,
    },
    {
        name: 'Skype',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Skype`,
        active: false,
    },
    {
        name: 'Steam',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Steam`,
        active: true,
    },
    {
        name: 'Telegram',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Telegram`,
        active: false,
    },
    {
        name: 'Mastodon',
        href: 'https://github.com/satnaing/astro-paper',
        linkTitle: `${SITE.title} on Mastodon`,
        active: false,
    },
]
