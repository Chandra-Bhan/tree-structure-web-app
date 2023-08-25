import { useEffect, useState } from "react";
import "./App.css";
import TreeNode from "./component/TreeNode";
import nodeJSONData from "./data.json";
import ReactJson from "react-json-view";
import Swal from "sweetalert2";

function App() {
  const [nodeData, setNodeData] = useState(nodeJSONData);
  const [tree, setTree] = useState(nodeData);

  const [show, setShow] = useState(false);

  const exportingSpecificDataOnly = (node) => {
    const exportNode = {
      name: node.name,
    };
    if (node.children) {
      exportNode.children = node.children.map(exportingSpecificDataOnly);
    }
    if (node.data) {
      exportNode.data = node.data;
    }
    return exportNode;
  };

  useEffect(() => {
    const expoTree = exportingSpecificDataOnly(nodeData);
    setNodeData(expoTree);
    setTree(expoTree);
  }, []);

  const handleAddChild = (node, child) => {
    const newChild = { name: "New Child", data: "Data" };
    if (node.data) {
      delete node.data;
    }
    node.children = [...(node.children || []), newChild];
    setTree({ ...tree });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added New Child",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateChildName = (node, e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      console.log("Enter");
      node.name = e.target.value;
      setTree({ ...tree });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Successfully Child Name",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateChildData = (node, e) => {
    if (e.key === "Enter") {
      node.data = e.target.value;
      setTree({ ...tree });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Successfully Child Data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="container">
        <TreeNode
          node={tree}
          addChild={handleAddChild}
          updateChildName={updateChildName}
          udpateChildData={updateChildData}
        />
        <button
          className="add_child_btn"
          style={{ margin: "20px 0" }}
          onClick={() => setShow(!show)}
        >
          Expand
        </button>
        {show && (
          <ReactJson
            src={tree}
            theme="tube"
            collapsed={false}
            invertTheme={true}
          />
        )}
      </div>
    </>
  );
}

export default App;
