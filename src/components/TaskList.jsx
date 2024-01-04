import { VStack, StackDivider, HStack, Text, Link } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function TaskList(token) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const authed = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      },
    });
    let { data: pages } = await authed.from("pages").select("*");

    return pages;
  };

  //let tasks = fetchData().map((page) => page.title);
  useEffect(() => {
    const fetchAndSetTasks = async () => {
      const data = await fetchData();
      setTasks(data.map((page) => page));
    };

    fetchAndSetTasks();
    console.log(tasks);
  }, []);

  //fetchData().then((data) => {
  //  setTasks(data.map((page) => page.name));
  // });

  if (!tasks.length) {
    return (
      <img
        src={
          "https://avatars.githubusercontent.com/u/153359426?s=400&u=ffe605829e9e4b8eb4498c05ef3b5e1907df50bb&v=4"
        }
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "25%",
        }}
      />
    );
  }

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {tasks.map((task) => (
          <HStack key={task.name}>
            <Text w="100%" p="8px" borderRadius="lg">
              <Link onClick={() => navigate(task.id)}>{task.name}</Link>{" "}
            </Text>{" "}
            <Link href={"/p/" + task.id} isExternal>
              <ExternalLinkIcon />
            </Link>
          </HStack>
        ))}{" "}
      </VStack>{" "}
    </>
  );
}
