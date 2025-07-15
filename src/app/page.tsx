"use client";
import { TreeGenerator } from "@/ParsingLogic/TreeGenerator";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { RefObject, useRef, useState } from "react";
import TreeViewer from "./TreeViewer/TreeView";
//have not handled any lint issues for now will update it while adding more functionalities
export default function Home() {
  const editorRef = useRef(null);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
    });
  };
  const [tree, setTree] = useState<any>(null);

  const handleGenerate = () => {
    if (!editorRef.current) return;
    const code = (editorRef.current as any).getValue();
    const newTree = TreeGenerator(code);
    setTree(newTree);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Editor
            // height="100vh"
            defaultLanguage="typescript"
            defaultValue="() => { return <div>Hello</div>; }"
            onMount={handleEditorMount}
          />
        </div>
        <button style={{ padding: "10px" }} onClick={() => handleGenerate()}>
          {"==>"}
        </button>
        <TreeViewer data={tree} />
      </div>
    </>
  );
}
