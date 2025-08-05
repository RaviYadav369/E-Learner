"use-client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface EditorProp {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
      ssr: false,
      loading: () => <p>Loading editor...</p>,
    })

export const Editor = ({ onChange, value }: EditorProp) => {

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
