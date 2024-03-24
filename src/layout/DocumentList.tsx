import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import ActionButton from "../components/ActionButton";
import { DocumentFilters } from "../App";
import EditModal from "../components/modals/EditModal";
import { Document } from "../hooks/useDocuments";

import AddModal from "../components/modals/AddModal";
import SearchInput from "../components/SearchInput";
import glavnaFunkcija from "../services/glavnaFunkcija";

interface Props {
  onSearch?: (searchText: string) => void;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  isFavoritesSelected: boolean;
  documentFilters: DocumentFilters;
}

const DocumentList: React.FC<Props> = ({
  onSearch,
  documents,
  setDocuments,
  isFavoritesSelected,
  documentFilters,
}) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditButtonClick = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <HStack justifyContent="space-between" paddingLeft={4} paddingRight={4}>
        <Button size="md" marginTop={5} onClick={handleAddModalOpen}>
          Додади нов документ +
        </Button>
        <AddModal
          isOpen={isAddModalOpen}
          onClose={handleAddModalClose}
          setDocuments={setDocuments}
        />

        <SearchInput onSearch={onSearch} />
      </HStack>

      <TableContainer padding={5}>
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
            {documents.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center" fontWeight="bold">
                  Нема {isFavoritesSelected ? "омилени" : ""} документи
                  {documentFilters.filterCategory?.id
                    ? " во избраната категорија"
                    : ""}
                </Td>
              </Tr>
            ) : (
              documents.map((doc) => (
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
                      isFavourites={isFavoritesSelected}
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
      {/* <Box marginTop={4} textAlign="center">
        {!isFirstPage && (
          <IconButton
            icon={<span>&laquo;</span>}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous Page"
          />
        )}
        <Text as="span" marginX={2}>
          Страница {currentPage + 1} од {filteredDocuments.length}
        </Text>
        {!isLastPage && (
          <IconButton
            icon={<span>&raquo;</span>}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next Page"
          />
        )}
      </Box> */}
    </>
  );
};

export default DocumentList;
