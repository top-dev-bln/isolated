import { VStack, StackDivider, HStack, Text, Link } from "@chakra-ui/react";
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
  const [pages, setpages] = useState([]);

  useEffect(() => {
    const fetchAndSetpages = async () => {
      const response = await fetch_uploads(token, id);
      const responseData = response.data;
      setpages(responseData.map((page) => page));
      console.log(pages);
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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Suji Pula</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              <Link>{page.name}</Link>{" "}
            </Text>{" "}
          </HStack>
        ))}{" "}
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
          Use Overlay one
        </Button>
      </VStack>{" "}
    </>
  );
}
