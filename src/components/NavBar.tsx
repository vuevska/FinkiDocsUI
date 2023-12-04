import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo-finki.png";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize={40} />
      <Text>Финки Документи</Text>
    </HStack>
  );
};

export default NavBar;
