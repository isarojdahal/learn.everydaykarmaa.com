import { useEffect, useRef } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

function Preview({ html, css, js }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const document = iframeRef.current?.contentDocument;
    const documentContent = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    document?.open();
    document?.write(documentContent);
    document?.close();
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default Preview;
