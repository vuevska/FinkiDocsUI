import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axiosInstance from "../services/axios";
import ActionButton from "../components/ActionButton";
import { DocumentQuery } from "../App";
import EditModal from "../components/EditModal";

interface Document {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

interface Props {
  documentQuery: DocumentQuery;
  isFavorites?: boolean;
  onClick?: () => void;
}

const DocumentList: React.FC<Props> = ({
  documentQuery,
  isFavorites = false,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          isFavorites ? "/favourites" : "/documents"
        );
        setDocuments(response.data);
      } catch (error) {
        console.error(
          `Error fetching ${isFavorites ? "favorites" : "documents"}:`,
          error
        );
        setError(`Error fetching ${isFavorites ? "favorites" : "documents"}.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isFavorites]);

  const filteredDocuments = documentQuery.category
    ? documents.filter((doc) => doc.categoryId === documentQuery.category?.id)
    : documents;

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      <Heading fontSize={25} marginTop={10} marginLeft={10}>
        {isFavorites ? "Омилени Документи" : "Документи"}
      </Heading>

      <TableContainer padding={10} marginTop={-5}>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Document Name</Th>
              <Th>Description</Th>
              <Th colSpan={5} textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDocuments.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center" fontWeight="bold">
                  Нема {isFavorites ? "омилени" : ""} документи во избраната
                  категорија
                </Td>
              </Tr>
            ) : (
              filteredDocuments.map((doc) => (
                <Tr key={doc.id}>
                  <Td>{doc.name}</Td>
                  <Td>{doc.description}</Td>
                  <Td>
                    <ActionButton
                      documentId={doc.id}
                      action={"view"}
                      size={"sm"}
                      padding={0}
                    />
                  </Td>
                  <Td>
                    <ActionButton
                      documentId={doc.id}
                      action={"edit"}
                      size={"sm"}
                      padding={0}
                      onClick={() => setSelectedDocumentId(doc.id)}
                    />
                  </Td>
                  <Td>
                    <ActionButton
                      documentId={doc.id}
                      action={"download"}
                      size={"sm"}
                      padding={0}
                    />
                  </Td>
                  <Td>
                    <ActionButton
                      documentId={doc.id}
                      action={"favourite"}
                      size={"sm"}
                      padding={0}
                    />
                  </Td>
                  <Td>
                    <ActionButton
                      documentId={doc.id}
                      action={"delete"}
                      size={"sm"}
                      padding={0}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedDocumentId !== null && (
          <EditModal documentId={selectedDocumentId} onClick={() => setSelectedDocumentId(null)} onClose={() => setSelectedDocumentId(null)} />

      )}
    </>
  );
};

export default DocumentList;
