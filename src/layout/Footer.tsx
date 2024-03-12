import React from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
      <Box bg="gray.200" p={4} paddingRight={40} paddingLeft={40}>
        <Flex align="center" justify="space-between">
          <Image src="src/assets/finki_46.png" alt="Logo"  height={240} width={360}/>

          <Flex>
            <Link href="https://www.facebook.com/FINKI.ukim.mk/" isExternal>
              <FaFacebook  fontSize="40px" mr={10}/>
            </Link>
            <Link href="https://twitter.com/FINKIedu" isExternal>
              <FaTwitter fontSize="40px" mr={10} />
            </Link>
            <Link href="https://www.linkedin.com/school/faculty-of-computer-science-and-engineering---skopje/" isExternal>
              <FaLinkedin fontSize="40px" mr={10} />
            </Link>
            <Link href="https://www.youtube.com/user/FINKIedu" isExternal>
              <FaYoutube fontSize="40px" mr={10} />
            </Link>
          </Flex>
        </Flex>
      </Box>
  );
};

export default Footer;
