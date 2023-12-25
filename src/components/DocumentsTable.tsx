import {SimpleGrid, Text } from "@chakra-ui/react";
import useDocuments from "../hooks/useDocuments";
import DocumentCard from "./DocumentCard";
import ActionButton from "./ActionButton";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import {
  MdPreview,
  MdEdit,
  MdOutlineDownloadForOffline,
  MdOutlineStarBorder,
  MdDelete,
} from "react-icons/md";
import { DocumentQuery } from "../App";
import {useState} from "react";
import Favourites from "./Favourites";
import { Link } from '@chakra-ui/react'


interface Props {
  documentQuery: DocumentQuery;
}

const DocumentsTable = ({ documentQuery }: Props) => {
  const { data, isLoading, error } = useDocuments(documentQuery);

  if (isLoading) return <Spinner />;

  return (
    <>
      {error && <Text>{error}</Text>}

      <TableContainer padding={10} marginTop={-5}>
        <Table variant="striped" colorScheme="blue">
          {/* <TableCaption>Документи според категорија</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length === 0 && (
              <Tr>
                <Td colSpan={3} textAlign="center" fontWeight="bold">
                  Нема документи во оваа категорија
                </Td>
              </Tr>
            )}
            {data?.map((document) => (
              <Tr key={document.id}>
                <Td>
                  <DocumentCard
                    key={document.id}
                    document={document}
                    name={""}
                    description={""}
                  />
                </Td>
                <Td>{document.description}</Td>
                <Td padding={0}>
                  <ActionButton documentId={document.id} size={"md"} padding={0} action={"view"}/>
                </Td>
                <Td padding={0}>
                  <ActionButton documentId={document.id} size={"md"} padding={0} action={"edit"}/>
                </Td>
                <Td padding={0}>
                  <ActionButton documentId={document.id} size={"md"} padding={0} action={"download"}/>
                </Td>
                <Td padding={0}>
                  <ActionButton documentId={document.id} size={"md"} padding={0} action={"favourite"}/>
                </Td>
                <Td padding={0}>
                  <ActionButton documentId={document.id} size={"md"} padding={0} action={"delete"}/>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Tfoot> */}


          {/*<a href={'/favourites'} >Favourites</a>*/}
          {/*<BrowserRouter>*/}
            {/*<Favourites />*/}
            {/*<Link to={'/favourites'} target="_blank" rel="noopener noreferrer">Favourites</Link>*/}
          {/*</BrowserRouter>*/}
          {/*<Link to={"/favourites"} target="_blank" rel="noopener noreferrer"></Link>*/}
          {/*<Link to="/favourites">Go to fave</Link>*/}
        </Table>
      </TableContainer>

    </>

);
};

export default DocumentsTable;
