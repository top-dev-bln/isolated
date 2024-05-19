import {
  Button,
  HStack,
  Input,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { create_page } from "../server.js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supaClient = createClient(supabaseUrl, supabaseAnonKey);

export default function AddTask() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function checkUserOnStart() {
    await supaClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        setToken(session.access_token);
      }
      if (!session) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const result = await create_page(token, text);
    setLoading(false);
    setText("");

    toast({
      title: result.create_status === "ok" ? "Page Created!" : "Error",
      position: "top",
      status: result.create_status === "ok" ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });

    if (result.create_status === "ok") {
      navigate(`/my-pages/${result.data[0].id}`);
    }
  }

  useEffect(() => {
    checkUserOnStart();
  }, []);

  return (
    <div>
      <Center>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Text
            fontSize="3xl"
            fontWeight="bold"
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom="10"
          >
            Create Upload Page
          </Text>
          <form onSubmit={handleSubmit}>
            <Text fontSize="xl">Page title</Text>
            <HStack my="4" h="45">
              <Input
                h="100%"
                variant="filled"
                placeholder="Title"
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
      </Center>
    </div>
  );
}
