import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <InputGroup marginRight={2}>
      <InputRightElement children={<BsSearch />} />
      <Input
        borderRadius={20}
        placeholder="Search documents..."
        variant="filled"
      ></Input>
    </InputGroup>
  );
};

export default SearchInput;
