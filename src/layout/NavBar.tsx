import {HStack, Image, Link, Text} from "@chakra-ui/react";
import logo from "../assets/logo-finki.png";
import ColorModeSwitch from "../components/ColorModeSwitch";
import SearchInput from "../components/SearchInput";

interface Props {
    onSearch: (searchText: string) => void;
}

const NavBar = ({onSearch}: Props) => {
    return (
        <div style={{width: "100%"}}>
            <HStack justifyContent="space-between" paddingLeft={4} paddingRight={4}>
                <div style={{alignItems: "start"}}>
                    <HStack>
                        <Link href="https://www.finki.ukim.mk/mk" isExternal>
                            <Image
                                src={logo}
                                alt="Finki Logo"
                                boxSize={{base: 39, md: 40, lg: 40}}
                            />
                        </Link>
                        <Text fontWeight="bold" fontSize={{base: 15, md: 20, lg: 25}}>
                            Финки <br/> Документи
                        </Text>
                    </HStack>
                </div>
                <HStack>
                    <div
                        style={{
                            alignItems: "end",
                        }}
                    >
                        <SearchInput onSearch={onSearch}/>
                        <br/>
                        <div style={{marginLeft: "120px"}}>
                            <ColorModeSwitch/>
                        </div>
                    </div>
                </HStack>
            </HStack>
        </div>
    );
};

export default NavBar;
