import { VStack, StackDivider, HStack, Text, Link } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetch_uploads } from "../server.js";
import PropTypes from "prop-types";
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




export default function UploadList({ token, id }) {
  UploadList.propTypes = {
    token: PropTypes.string,
    id: PropTypes.string,
  };

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    const fetchAndSetPages = async () => {
      const response = await fetch_uploads(token, id);
      const responseData = response.data;
      setPages(responseData.map((page) => page));
    };

    fetchAndSetPages();
  }, []);

  const openModal = (page) => {
    setSelectedPage(page);
    setOverlay(<OverlayOne />);
    onOpen();
  };

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
              <Link onClick={() => openModal(page)}>{page.name}</Link>
            </Text>
          </HStack>
        ))}
      </VStack>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader  textColor={"brand.jet"}>{selectedPage?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text  textColor={"brand.jet"}>Files:</Text>
            <VStack
              divider={<StackDivider />}
              borderColor="gray.100"
                borderWidth="2px"
                textColor={"brand.jet"}
              p="5"
              borderRadius="lg"
              w="100%"
              maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
              alignItems="stretch"
            >
              {selectedPage?.files.map((file) => (
                <HStack key={file.id}>
                  <Text w="100%" p="8px" borderRadius="lg">
                    <Link
                      href={`https://drive.google.com/file/d/${file.link}/view`}
                    >
                      {`${file.name.substring(
                        0,
                        file.name.lastIndexOf(".")
                      )}`.substring(0, 20) +
                        `${file.name.slice(file.name.lastIndexOf("."))}`}
                    </Link>
                  </Text>
                  <Link
                    href={`https://drive.google.com/uc?id=${file.link}&export=download`}
                    isExternal
                  >
                    <DownloadIcon />
                  </Link>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </ChakraProvider>{" "}
    </>
  );
}
