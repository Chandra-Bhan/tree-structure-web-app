import React, { useState } from "react";

function TreeNode({ node, addChild, updateChildName, udpateChildData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [childFieldValue, setChildFieldValue] = useState(node.name);
  const [dataFieldValue, setDataFieldValue] = useState(node.data);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChangingChildName = (node, e) => {
    if (e.key === "Enter") {
      setShow(!show);
    }
    updateChildName(node, e);
  };

  const handleChangingChildData = (node, e) => {
    udpateChildData(node, e);
  };

  return (
    <div className="content_container child_container_div">
      <div className="main-content">
        <div style={{ width: "100%" }}>
          <div className="node_name">
            <div>
              <button className="expander_btn" onClick={handleClick}>
                {isOpen ? <span>v</span> : <span>&gt;</span>}
              </button>
              <span>
                {!show ? (
                  <span onClick={() => setShow(!show)}>{node.name}</span>
                ) : (
                  <input
                    className="child_name_updating_input"
                    type="text"
                    placeholder={node.name}
                    value={childFieldValue}
                    onChange={(e) => setChildFieldValue(e.target.value)}
                    onKeyDown={(e) => handleChangingChildName(node, e)}
                  />
                )}
              </span>
            </div>
            <div className="new_child_creater_div">
              <button
                className="add_child_btn"
                onClick={() => {
                  addChild(node, {
                    childFieldValue,
                    dataFieldValue,
                  });
                }}
              >
                Add Child
              </button>
            </div>
          </div>
          {node.data && (
            <div className="data_container_div">
              <span className="data_heading">Data: </span>{" "}
              <input
                className="data_changing_input"
                type="text"
                placeholder={node.data}
                value={dataFieldValue}
                onChange={(e) => setDataFieldValue(e.target.value)}
                onKeyDown={(e) => handleChangingChildData(node, e)}
              />
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="child_container_parent_div">
          {node.children &&
            node.children.map((child) => (
              <div className="child_container_div" key={child.name}>
                <TreeNode
                  node={child}
                  addChild={addChild}
                  updateChildName={updateChildName}
                  udpateChildData={udpateChildData}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
