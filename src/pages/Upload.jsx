import { useState, useRef, useEffect } from "react";
import { Button, HStack, Input, useToast, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { upload_file, page_info } from "../server.js";

//todo inteles use ref si cum functioneaza luarea de fisiere
export default function Upload() {
  const { id } = useParams();
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef(null);
  const toast = useToast();
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", text);

    droppedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const result = await upload_file(id, formData);

    setLoading(false);
    setText("");
    setDroppedFiles([]);

    toast({
      title: result.upload_status === "ok" ? "Uploaded!" : "Error",
      position: "top",
      status: result.upload_status === "ok" ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });
  }
  const removeFile = (index) => {
    const updatedFiles = [...droppedFiles];
    updatedFiles.splice(index, 1);
    setDroppedFiles(updatedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    if (droppedFiles.length + files.length > 10) {
      toast({
        title: "Error",
        description: "You can upload a maximum of 10 files.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setDroppedFiles([...droppedFiles, ...files]);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);

    if (droppedFiles.length + files.length > 10) {
      toast({
        title: "Error",
        description: "You can upload a maximum of 10 files.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setDroppedFiles([...droppedFiles, ...files]);
  };

  useEffect(() => {
    const fetchAndSetinfo = async () => {
      const response = await page_info(id);
      const data = await response.json();
      setTitle(data.name);
    };

    fetchAndSetinfo();
  }, []);

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
      <h1> Upload </h1> <p style={{ marginTop: "1rem" }}> {title} </p>{" "}
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
          cursor: "pointer",
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
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <HStack>
              <Text>{file.name}</Text>{" "}
              <Button onClick={() => removeFile(index)} ml={2}>
                X
              </Button>{" "}
            </HStack>
          </li>
        ))}{" "}
      </ul>{" "}
      <form onSubmit={handleSubmit}>
        <Text fontSize="xl">Name</Text>
        <HStack my="4" h="45">
          <Input
            h="100%"
            variant="filled"
            placeholder="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Adding"
            colorScheme="teal"
            h="100%"
          >
            Blow Me!{" "}
          </Button>{" "}
        </HStack>{" "}
      </form>
    </div>
  );
}
