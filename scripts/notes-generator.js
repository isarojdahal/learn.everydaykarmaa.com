const axios = require("axios");
const xml2js = require("xml2js");
const fs = require("fs-extra");
const path = require("path");

const playlistId = "PL4njvVBDLL21S6bEXRC7agpBnVPiXNbj5"; // Replace with your YouTube playlist ID
const notesName = "reactjs"; // Replace with your note name
const sourceCodeUrl = "https://github.com/isarojdahal"; // Replace with the source code URL or set as empty if not applicable

async function fetchPlaylistRSS() {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

  try {
    const response = await axios.get(rssUrl);
    const xmlData = response.data;
    const parser = new xml2js.Parser();

    parser.parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      const entries = result.feed.entry;
      if (entries) {
        entries.forEach((entry, index) => {
          const videoTitle = entry.title[0];
          const videoId = entry["yt:videoId"][0];

          // Format title for the file name, replacing invalid characters and shortening if needed
          const sanitizedTitle = sanitizeTitle(videoTitle);

          // Define the path to the notes folder one level up from the script location
          const parentDir = path.resolve(__dirname, ".."); // Go one level up
          const notesDir = path.join(parentDir, "notes", notesName);
          const filePath = path.join(
            notesDir,
            `${index + 1}. ${sanitizedTitle}.md`
          );

          // Ensure the notes directory exists
          fs.ensureDirSync(notesDir);

          // Create the Markdown content with the dynamic sidebar position
          const markdownContent = generateMarkdown(
            sanitizedTitle,
            videoId,
            sourceCodeUrl,
            index + 1
          );

          // Write the Markdown file directly
          fs.writeFileSync(filePath, markdownContent, "utf8");

          console.log(`Markdown file created for: ${videoTitle}`);
        });
      } else {
        console.log("No entries found in the playlist.");
      }
    });
  } catch (error) {
    console.error("Error fetching playlist RSS:", error);
  }
}

function sanitizeTitle(title) {
  // Remove invalid characters and replace spaces with hyphens
  let sanitized = title
    .toLowerCase()
    .replace(/[<>:"\/\\|?*(),]+/g, "") // Remove invalid characters including parentheses
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .trim(); // Trim leading/trailing whitespace

  if (sanitized.length > 50) {
    sanitized = sanitized.substring(0, 50);
  }

  return sanitized;
}

function generateMarkdown(title, videoId, sourceCodeUrl, sidebarPosition) {
  return ```---\ntitle: ${title}
  sidebar_position: ${sidebarPosition}
  \n---\n\nimport YouTubeEmbed from '../../src/components/YoutubeEmbed';
  \n\n# ${title}\n\n<YouTubeEmbed videoId="${videoId}" />
  
  \n\n${
    sourceCodeUrl
      ? "## Source Code\n\n- [**Github**](" + sourceCodeUrl + ")"
      : ""
  }```;
}

fetchPlaylistRSS();
