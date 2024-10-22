import React from "react";
// import { useColorMode } from "@theme-original;
import Giscus from "@giscus/react";

export default function GiscusComponent() {
  // const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="isarojdahal/learn.everydaykarmaa.com"
      repoId="R_kgDOMk78lw"
      category="General"
      categoryId="DIC_kwDOMk78l84CjlWv" // E.g. id of "General"
      mapping="title" // Important! To map comments to URL
      term="Welcome to @giscus/react component!"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      // theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}
