import React from "react";
import DocItem from "@theme-original/DocItem";
import type DocItemType from "@theme/DocItem";
import type { WrapperProps } from "@docusaurus/types";
import GiscusComponent from "@site/src/components/Giscus";

type Props = WrapperProps<typeof DocItemType>;

export default function DocItemWrapper(props: Props): JSX.Element {
  return (
    <>
      <DocItem {...props} />
      <div style={{ marginTop: "20px" }}>
        <GiscusComponent />
      </div>
    </>
  );
}
