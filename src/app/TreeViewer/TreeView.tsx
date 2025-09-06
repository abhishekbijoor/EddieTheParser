import { TreeNode } from "@/ParsingLogic/TreeGenerator";
import React from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";
interface DataTreeNode {
  data: TreeNode | null;
}

// Helper to convert your TreeNode into react-d3-tree format
function toD3Tree(node: TreeNode): RawNodeDatum {
  return {
    name: node.name ?? "Unknown",
    children: node.children?.map(toD3Tree) || [],
  };
}

export default function TreeViewer({ data }: DataTreeNode) {
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
        <Tree data={toD3Tree(data)} />
      </div>
    </div>
  );
}
