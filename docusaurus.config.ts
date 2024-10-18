import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Learn.everydaykarmaa",
  tagline: "Learn Everyday with EverydayKarma",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://learn.everydaykarmaa.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "EverydayKarma", // Usually your GitHub org/user name.
  projectName: "Learn.EverydayKarma", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "G-J2XD1WFCB6",
          anonymizeIP: true,
        },
        docs: {
          path: "notes",
          routeBasePath: "notes",
          sidebarPath: "./sidebars.ts",

          // Custom sidebar for AWS
          // sidebarPath: ({ locale, version }) =>
          //   locale === "aws"
          //     ? require.resolve("./awsSidebar.js")
          //     : require.resolve("./sidebars.js"),
          // sidebarPath: ({ locale, version }) =>
          //   locale === "github"
          //     ? require.resolve("./githubSidebar.js")
          //     : require.resolve("./sidebars.js"),

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/isarojdahal/learn.everydaykarmaa.com/tree/develop/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },

        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/logo.jpg",
    navbar: {
      title: "",
      logo: {
        alt: "EK Notes Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "javascriptSidebar",
          position: "left",
          label: "JavaScript",
          to: "/notes/javascript",
        },
        {
          type: "docSidebar",
          sidebarId: "awsSidebar",
          position: "left",
          label: "AWS",
          to: "/notes/aws",
        },
        {
          type: "docSidebar",
          sidebarId: "githubSidebar",
          position: "left",
          label: "Git/Github",
          to: "/notes/github",
        },
        {
          type: "docSidebar",
          sidebarId: "typeormSidebar",
          position: "left",
          label: "TypeORM",
          to: "/notes/typeorm",
        },
        {
          type: "docSidebar",
          sidebarId: "graphqlSidebar",
          position: "left",
          label: "GraphQL",
          to: "/notes/graphql",
        },
        { to: "/blog", label: "Blog", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Websites",

          items: [
            {
              label: "EverydayKarma",
              to: "https://everydaykarmaa.com",
            },
          ],
        },
        {
          title: "Social Handles",
          items: [
            {
              label: "YouTube",
              href: "https://youtube.com/@Everydaykarma",
            },
            {
              label: "Discord",
              href: "https://bit.ly/ek_discord",
            },
          ],
        },
        {
          title: "Contribute ",
          items: [
            {
              label: "EverydayKarma - Website",
              href: "https://github.com/isarojdahal/everydaykarmaa.com",
            },
            {
              label: "EverydayKarma - Learn",
              href: "https://github.com/isarojdahal/learn.everydaykarmaa.com",
            },
          ],
        },
      ],
      copyright: `<br/>Copyright © 2024 -  ${new Date().getFullYear()}. Built by Community using Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
