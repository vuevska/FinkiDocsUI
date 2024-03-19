import React from "react";
import { Box, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const { colorMode } = useColorMode();

    return (
        <Box
            p={4}
            paddingRight={40}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
            bg={colorMode === "dark" ? "blue.700" : "blue.100"}
        >
            <Flex align="center" justify="space-between">
                <Box width="30%">
                    <iframe
                        width="100%"
                        height="200"
                        frameBorder="0"
                        scrolling={"no"}
                        marginHeight={0}
                        marginWidth={0}
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D1%83%D0%BB.%20%D0%A0%D1%83%D1%93%D0%B5%D1%80%20%D0%91%D0%BE%D1%88%D0%BA%D0%BE%D0%B2%D0%B8%D1%9C%2016+(Finki)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    >
                        <a href="https://www.gps.ie/">gps vehicle tracker</a>
                    </iframe>
                </Box>

                <Box width="40%">
                    <Flex flexDirection="column" align="center" paddingLeft={40}>
                        <Text fontSize="lg" fontWeight="bold" align="center">АДРЕСА</Text>
                        <Text align="center">ул. Руѓер Бошковиќ 16, Пoштенски Фах 393, 1000, Скопје, Република Северна Македонија</Text>
                        <Text mt={2} fontSize="lg" fontWeight="bold" align="center">КОНТАКТ:</Text>
                        <Text align="center">contact@finki.ukim.mk</Text>
                    </Flex>
                </Box>

                <Flex align="center" justify="flex-end" width="30%">
                    <Link href="https://www.facebook.com/FINKI.ukim.mk/" isExternal p={2}>
                        <FaFacebook fontSize="40px" mr={10} />
                    </Link>
                    <Link href="https://twitter.com/FINKIedu" isExternal p={2}>
                        <FaTwitter fontSize="40px" mr={10} />
                    </Link>
                    <Link href="https://www.linkedin.com/school/faculty-of-computer-science-and-engineering---skopje/" isExternal p={2}>
                        <FaLinkedin fontSize="40px" mr={10} />
                    </Link>
                    <Link href="https://www.youtube.com/user/FINKIedu" isExternal p={2}>
                        <FaYoutube fontSize="40px" mr={10} />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;
