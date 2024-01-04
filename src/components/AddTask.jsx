import { Button, HStack, Input } from "@chakra-ui/react";

export default function AddTask() {
  return (
    <form>
      <HStack my="4" h="45">
        <Input h="100%" variant="filled" placeholder="Numele la cal" />
        <Button colorScheme="teal" h="100%" type="submit" loadingText="Adding">
          Add{" "}
        </Button>{" "}
      </HStack>{" "}
    </form>
  );
}
