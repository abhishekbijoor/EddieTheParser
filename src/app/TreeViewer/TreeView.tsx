import React, { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
export default function TreeViewer({ data }: any) {
  console.log(`Tree Viewer data ${JSON.stringify(data)}`);
  if (!data) return <div>No node found</div>;
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div>
      <div
        id="treeWrapper"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <Tree data={data} />
      </div>
    </div>
  );
}
