import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "EK Notes",
  tagline: "Easy peasy notes",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

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
      title: "EK Notes",
      logo: {
        alt: "EK Notes Logo",
        src: "img/logo.png",
      },
      items: [
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
          sidebarId: "graphqlSidebar",
          position: "left",
          label: "GraphQL",
          to: "/notes/graphql",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",

          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
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
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://blog.everydaykarmaa.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/isarojdahal/notes.everydaykarmaa.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EverydayKarma Notes. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
