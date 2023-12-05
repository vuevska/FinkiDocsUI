import { SimpleGrid, Text } from "@chakra-ui/react";
import useDocuments from "../hooks/useDocuments";
import DocumentCard from "./DocumentCard";
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
import { Category } from "../hooks/useCategories";

interface Props {
  selectedCategory: Category | null;
}

const DocumentsTable = ({ selectedCategory }: Props) => {
  const { data, isLoading, error } = useDocuments(selectedCategory);

  if (isLoading) return <Spinner />;
  return (
    <>
      {error && <Text>{error}</Text>}

      <TableContainer padding={10}>
        <Table variant="striped" colorScheme="blue">
          <TableCaption>Документи според категорија</TableCaption>
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
                  <MdPreview fontSize={20} />
                </Td>
                <Td padding={0}>
                  <MdEdit fontSize={20} />
                </Td>
                <Td padding={0}>
                  <MdOutlineDownloadForOffline fontSize={20} />
                </Td>
                <Td padding={0}>
                  <MdOutlineStarBorder fontSize={20} />
                </Td>
                <Td padding={0}>
                  <MdDelete fontSize={20} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default DocumentsTable;
