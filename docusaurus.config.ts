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
          type: 'dropdown',
          label: 'Learning',
          position: 'left',
          to: 'learning/',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'RLSidebar',
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
          ],
        },
        {
          label: 'About',
          position: 'left', // or 'right'
          to: '/about',
          items: [
            {
              to: '/about/CV', // replace with your actual page paths
              label: 'Curriculum Vitae',
            },
            {
              to: '/about/projects',
              label: 'Projects',
            }
            // add more pages as needed
          ],
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About Me',
          items: [
            {
              label: 'About Me',
              to: '/about'
            },
            {
              label: 'Projects',
              to: '/about/projects',
            },
            {
              label: 'Curriculum Vitae',
              to: '/about/CV',
            },
          ],
        },
        {
          title: 'Reinforcement Learning',
          items: [/*
            {
              label: 'Foundations of Deep RL',
              to: '/docs/reinforcement-learning',
            },*/
          ],
        },
        {
          title: 'Machine Learnig',
          items: [ /*
            {
              label: 'Designing Machine Learning Systems',
              to: '/docs/machine-learnin',
            },*/
          ],
        },
        {
          title: 'Statistics',
          items: [
            /* {
              label: '(Not that) Basic Statistical Concepts',
              to: '/docs/statistics/basic-statistics',
            },
            {
              label: 'A Practical Guide to A/B Testing',
              to: '/docs/statistics/experimentation',
            },*/
          ],
        }, // TODO: insert contact links
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
