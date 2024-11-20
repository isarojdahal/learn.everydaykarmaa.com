import { useState } from "react";
import Editor from "@monaco-editor/react";
import Preview from "./Preview";

function CodeEditor() {
  const [html, setHtml] = useState("<body>Hello world !</body>");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  return (
    <div className="flex-col  rounded overflow-hidden shadow-lg bg-white">
      <div className="flex gap-4">
        <div className="p-10 bg-red w-1/3 h-[200px] ">
          <h3>HTML</h3>
          <Editor
            height="200px"
            language="html"
            value={html}
            onChange={(value) => setHtml(value || "")}
            options={{ minimap: { enabled: false } }}
          />
        </div>

        <div className="p-10 bg-green w-1/3 h-[200px]">
          <h3>CSS</h3>
          <Editor
            height="200px"
            language="css"
            value={css}
            onChange={(value) => setCss(value || "")}
            options={{ minimap: { enabled: false } }}
          />
        </div>
        <div className="p-10 bg-red md:w-1/3 h-[200px] ">
          <h3>JS</h3>
          <Editor
            height="200px"
            language="javascript"
            value={js}
            onChange={(value) => setJs(value || "")}
            options={{ minimap: { enabled: false } }}
          />
        </div>
      </div>

      <div className="w-full p-5 mt-40">
        <Preview html={html} css={css} js={js} />
      </div>
    </div>
  );
}

export default CodeEditor;
