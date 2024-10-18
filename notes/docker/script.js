const fs = require("fs");
const path = require("path");

// Array of video data with title, videoId, and sidebar position
const videos = [
  {
    title: "Introduction to Docker. Image vs Container",
    videoId: "Egfvjnl8pRo",
    position: 1,
  },
  {
    title: "Understanding Dockerfile, Creating Images, DockerIgnore",
    videoId: "Y7iMP6dXTlw",
    position: 2,
  },
  {
    title: "DockerHub, Pushing Image to DockerHub && Exploring Images",
    videoId: "YdSCJJ6STBPA",
    position: 3,
  },
  {
    title: "Docker Compose in Detail",
    videoId: "YgWRR3L1Lgwc",
    position: 4,
  },
  {
    title: "Layerings and Cachings in Docker",
    videoId: "CwxCjZ3_m2c",
    position: 5,
  },
  {
    title: "Networking in Docker",
    videoId: "xjkipOwRF6E",
    position: 6,
  },
  {
    title: "Dockerize Full stack MERN App",
    videoId: "fCHJnefqE1w",
    position: 7,
  },

  // Add more videos as needed
];

// Template for markdown file
const template = `---
title: {{title}}
sidebar_position: {{position}}
---

import YouTubeEmbed from '/src/components/YoutubeEmbed.tsx';

# {{title}}

<YouTubeEmbed videoId="{{videoId}}" />


`;

// Folder where the markdown files will be saved
// __dirname will get the current directory where generateDocs.js is located
const docsDir = path.join(__dirname);

// Loop through each video and generate a markdown file
videos.forEach((video) => {
  const mdContent = template
    .replace(/{{title}}/g, video.title)
    .replace(/{{videoId}}/g, video.videoId)
    .replace(/{{position}}/g, video.position);

  // Generate a slug from the title for the filename
  const fileName = video.title;
  const filePath = path.join(docsDir, `${fileName}.md`);

  // Write the markdown file in the current directory
  fs.writeFileSync(filePath, mdContent, "utf8");
  console.log(`Generated ${filePath}`);
});

console.log("Markdown files generated successfully in the current directory!");
