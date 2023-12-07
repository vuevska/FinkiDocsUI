import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo-finki.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack justifyContent="space-between" paddingLeft={4} paddingRight={4}>
      <HStack>
        <Image
          src={logo}
          alt="Finki Logo"
          boxSize={{ base: 39, md: 40, lg: 40 }}
        />

        <Text fontWeight="bold" fontSize={{ base: 15, md: 20, lg: 25 }}>
          Финки <br /> Документи
        </Text>
      </HStack>
      <HStack>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
