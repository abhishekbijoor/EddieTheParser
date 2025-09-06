import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import generate from "@babel/generator";

export interface TreeNode {
  type: "element" | "text" | "expression";
  name: string | undefined;
  children: TreeNode[] | [];
}

export const TreeGenerator = (code: string) => {
  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
    });
    let tree = null;
    traverse(ast, {
      ReturnStatement(path) {
        const argument = path.node.argument;
        if (argument) {
          tree = jsxToTreee(argument);
          console.log(tree);
        }
      },
    });
    return tree;
  } catch (err) {
    console.log("Parser error: ", err);
    return null;
  }
};

export const jsxToTreee = (node: types.Node): TreeNode | null => {
  //this takes all the tags
  if (types.isJSXElement(node)) {
    const tagname = (node.openingElement.name as types.JSXIdentifier).name;
    return {
      type: "element",
      name: tagname,
      children: node.children
        .map((child) => jsxToTreee(child))
        .filter((child): child is TreeNode => child != null),
    };
    //this takes the text within the tags
  } else if (types.isJSXText(node)) {
    const text = node.value.trim();
    if (text === "") {
      return null;
    }
    return {
      type: "text",
      name: text,
      children: [],
    };
    //this takes {exp} values within the tags
  } else if (types.isJSXExpressionContainer(node)) {
    return {
      type: "expression",
      name: generate(node.expression).code,
      children: [],
    };
  }
  return null;
};
