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
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "45%" }}>
          <Editor
            // height="100vh"
            defaultLanguage="typescript"
            defaultValue={`() => {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const name = "World";

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-sm">
      <h1 className="text-xl font-bold">Hello, {name} </h1>

      <p className="mt-2 text-gray-600">
        You clicked <span className="font-semibold">{count}</span> times.
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Click Me
      </button>

      <button
        onClick={() => setShowMessage(!showMessage)}
        className="mt-2 ml-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Toggle Message
      </button>

      {showMessage && (
        <p className="mt-3 text-green-700 font-medium">
          Keep going! 
        </p>
      )}
    </div>
  );
}`}
            onMount={handleEditorMount}
          />
        </div>
        <button
          onClick={() => handleGenerate()}
          style={{
            padding: "10px",
            backgroundColor: "silver",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {"==>"}
        </button>
        <div style={{ flex: 1, overflow: "auto" }}>
          <TreeViewer data={tree} />
        </div>
      </div>
    </>
  );
}
