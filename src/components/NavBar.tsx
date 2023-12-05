import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo-finki.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding={10}>
      <HStack>
        <Image src={logo} boxSize={{ base: 39, md: 40, lg: 40 }} />

        <Text fontWeight="bold" fontSize={{ base: 15, md: 20, lg: 25 }}>
          Финки <br /> Документи
        </Text>
      </HStack>
      <HStack>
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
