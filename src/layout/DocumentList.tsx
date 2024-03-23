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
  Box,
} from "@chakra-ui/react";
import axiosInstance from "../services/axios";
import ActionButton from "../components/ActionButton";
import { DocumentQuery } from "../App";
import EditModal from "../components/modals/EditModal";
import { Document } from "../hooks/useDocuments";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages,
} from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

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
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const perPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          isFavorites ? "/favourites" : "/documents"
        );
        setDocuments(response.data);
        console.log("dokumenti", response.data);
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

  const handleEditButtonClick = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const pageCount = Math.ceil(filteredDocuments.length / perPage);

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
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDocuments.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center" fontWeight="bold">
                  Нема {isFavorites ? "омилени" : ""} документи
                  {documentQuery.category?.id ? " во избраната категорија" : ""}
                </Td>
              </Tr>
            ) : (
              filteredDocuments
                //.slice(currentPage * perPage, (currentPage + 1) * perPage)
                .map((doc) => (
                  <Tr key={doc.id}>
                    <Td>{doc.name}</Td>
                    <Td>{doc.description}</Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"view"}
                        size={"sm"}
                        padding={0}
                        setDocuments={setDocuments}
                        documents={documents}
                      />
                    </Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"fill"}
                        size={"sm"}
                        padding={0}
                        setDocuments={setDocuments}
                        documents={documents}
                      />
                    </Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"edit"}
                        size={"sm"}
                        padding={0}
                        onClick={handleEditButtonClick}
                        documents={documents}
                        setDocuments={setDocuments}
                      />
                    </Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"download"}
                        size={"sm"}
                        padding={0}
                        documents={documents}
                        setDocuments={setDocuments}
                      />
                    </Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"favourite"}
                        size={"sm"}
                        padding={0}
                        setDocuments={setDocuments}
                        documents={documents}
                        isFavourites={isFavorites}
                      />
                    </Td>
                    <Td>
                      <ActionButton
                        documentId={doc.id}
                        action={"delete"}
                        size={"sm"}
                        padding={0}
                        documents={documents}
                        setDocuments={setDocuments}
                      />
                    </Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedDocumentId !== null && (
        <EditModal
          documentId={selectedDocumentId}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedDocumentId(null);
          }}
          documents={[]}
          setDocuments={(value: React.SetStateAction<Document[]>) => {
            throw new Error("Function not implemented.");
          }}
        />
      )}

      {/* <Box
        p={2}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Paginator
          activeStyles={{ bg: "blue.300" }}
          innerLimit={2}
          outerLimit={2}
          currentPage={currentPage + 1}
          onPageChange={handlePageChange}
          pagesQuantity={pageCount}
        >
          <Previous as="button" bg={"white"}>
            <CgChevronLeft />
          </Previous>
          <PageGroup align="center" />
          <Next as="button" bg="white">
            <CgChevronRight />
          </Next>
        </Paginator>
      </Box> */}
    </>
  );
};

export default DocumentList;
