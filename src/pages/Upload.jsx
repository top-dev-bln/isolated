import { useState, useRef, useEffect } from "react";
import { Button, HStack, useToast, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { upload_file, page_info } from "../server.js";
import Footer from "../components/Footer.jsx";

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
    <div>
    <div className="App h-screen bg-gradient-to-r from-blue-500 to-teal-500"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 className="text-white text-7xl mb-3"> Upload </h1> <p style={{ marginTop: "1rem" }}> {title} </p>{" "}
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
          border: "1px solid white",
          cursor: "pointer",
        }}
        onClick={handleFileInputClick}
      >
        <div className="text-white"> Click or drop files here </div>{" "}
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
              <Text className="text-white  mt-3 mb-3">{file.name}</Text>{" "}
              <Button className="text-white" onClick={() => removeFile(index)} ml={2}>
                X
              </Button>{" "}
            </HStack>
          </li>
        ))}{" "}
      </ul>{" "}
      





      <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <label className="block text-2xl text-white mb-4">Enter your name</label>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="your name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          className="w-full p-3 rounded-l-lg text-gray-800 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#258EA6] hover:bg-[#659AA6] text-white font-bold py-3 px-6 rounded-r-lg transition-colors duration-300 ${loading ? "cursor-not-allowed" : ""}`}
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>
      </form>
      
    </div>
    <Footer />
    </div>
  );
}
