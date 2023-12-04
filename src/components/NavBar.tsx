import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo-finki.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding={10}>
      <HStack>
        <Image src={logo} boxSize={40} />
        <Text>
          Финки <br /> Документи
        </Text>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
