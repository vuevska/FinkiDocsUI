import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <Box marginTop={5}>
        <InputGroup marginRight={2}>
          <InputRightElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={10}
            placeholder="Пребарај документ..."
            variant="filled"
          ></Input>
        </InputGroup>
      </Box>
    </form>
  );
};

export default SearchInput;
