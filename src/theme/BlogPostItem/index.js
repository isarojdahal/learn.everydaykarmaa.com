import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import Giscus from "@site/src/components/Giscus";

export default function BlogPostItemWrapper(props) {
  // Access metadata directly from props instead of using useBlogPost
  const { metadata } = props.children.type;

  if (!metadata) {
    return <BlogPostItem {...props} />;
  }

  const { frontMatter } = metadata;
  const { enableComments } = frontMatter;

  return (
    <>
      <BlogPostItem {...props} />
      {enableComments && <Giscus />}
    </>
  );
}
