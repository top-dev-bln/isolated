import { VStack, StackDivider, HStack, Text, Link } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { fetch_pages } from "../server.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  colors: {
    brand: {
      night: "#0A0A0A",
      spring: "#5CFF9D",
      mint: "#F0F7EE",
      jet: "#333135"
      
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.night",
        color: "brand.mint",
      },
    },
  },
})


export default function PageList(token) {
  const navigate = useNavigate();
  const [pages, setpages] = useState([]);

  useEffect(() => {
    const fetchAndSetpages = async () => {
      const response = await fetch_pages(token.token);
      const responseData = response.data;
      setpages(responseData.map((page) => page));
    };

    fetchAndSetpages();
  }, []);

  if (!pages.length) {
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
      <ChakraProvider theme={theme}>
  
 
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
        {pages.map((page) => (
          <HStack key={page.name}>
            <Text w="100%" p="8px" borderRadius="lg">
              <Link onClick={() => navigate(page.id)}>{page.name}</Link>{" "}
            </Text>{" "}
            <Link href={"/p/" + page.id} isExternal>
              <ExternalLinkIcon />
            </Link>
          </HStack>
        ))}{" "}
        </VStack>{" "}
         </ChakraProvider>{" "}
    </>
  );
}
