import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Upload() {
  const { id } = useParams();
  const [droppedFiles, setDroppedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setDroppedFiles([...droppedFiles, ...files]); // Append new files to existing files
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setDroppedFiles([...droppedFiles, ...files]); // Append new files to existing files
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1> Upload </h1> <p style={{ marginTop: "1rem" }}> {id} </p>{" "}
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{
          padding: "1rem",
          width: "300px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          border: "1px solid black",
          cursor: "pointer", // Add this line
        }}
        onClick={handleFileInputClick}
      >
        <div> Click or drop files here </div>{" "}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
        />
      </div>{" "}
      <ul>
        {" "}
        {droppedFiles.map((file, index) => (
          <li key={index}> {file.name} </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}
