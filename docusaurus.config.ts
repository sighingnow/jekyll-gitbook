import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Lucas Cruz',
  favicon: 'img/favicon/favicon.ico',

  // Set the production url of your site here
  url: 'https://lucas-cruz.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cruz-lucas', // Usually your GitHub org/user name.
  projectName: 'cruz-lucas.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        // {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Lucas Cruz',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'RLSidebar',
          position: 'left',
          label: 'Reinforcement Learning',
        },
        {
          type: 'docSidebar',
          sidebarId: 'MLSidebar',        
          label: 'Machine Learning',
        },
        {
          type: 'docSidebar',
          sidebarId: 'StatsSidebar',        
          label: 'Statistics',
        },
        {
          to: 'CV',
          label: 'Curriculum Vitae',
          position: 'right',
        },
        {
          href: 'https://github.com/cruz-lucas',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About Me',
          items: [
            {
              label: 'Projects',
              to: '/docs/intro',
            },
            {
              label: 'Curriculum Vitae',
              to: '/docs/intro',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/cruz-lucas/',
            },
            {
              label: 'LinkdIn',
              href: 'https://www.linkedin.com/in/lucasdearaujocruz/',
            },
          ],
        },
        {
          title: 'Reinforcement Learning',
          items: [
            {
              label: 'Foundations of Deep RL',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'General Machine Learnig',
          items: [
            {
              label: 'Designing Machine Learning Systems',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Statistics',
          items: [
            {
              label: '(Not that) Basic Statistical Concepts',
              to: '/docs/intro',
            },
            {
              label: 'A Practical Guide to A/B Testing',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lucas Cruz. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
