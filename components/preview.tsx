"use-client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

interface PreviewProp {
  value: string;
}

export const Preview = ({ value }: PreviewProp) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  return <ReactQuill theme="bubble" value={value} />;
};
