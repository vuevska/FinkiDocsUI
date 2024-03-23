import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Document } from "../../hooks/useDocuments";

interface EditModalProps {
  documentId: number;
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const EditModal: React.FC<EditModalProps> = ({
  documentId,
  isOpen,
  onClose,
  documents,
  setDocuments,
}) => {
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axiosInstance.get<Document[]>("/documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axiosInstance.get(
          `/documents/get/${documentId}`
        );
        const { name, description } = response.data;
        setDocumentName(name);
        setDocumentDescription(description);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchDocument();
  }, [documentId]);

  const updateDocument = async () => {
    try {
      if (!documentName || !documentDescription || !file) {
        setError("Пополнете ги сите полиња.");
        return;
      }

      const formData = new FormData();
      formData.append("name", documentName);
      formData.append("description", documentDescription);
      if (file) {
        // Only append the file if it exists
        formData.append("file", file);
        console.log(file);
      }

      const response = await axiosInstance.put(
        `/documents/edit/${documentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedDocumentsResponse = await axiosInstance.get<Document[]>(
        "/documents"
      );
      setDocuments(updatedDocumentsResponse.data);
      onClose();
      toast.success("Document updated successfully.");
    } catch (error: any) {
      setError(error.message);
      toast.error("Error updating document: " + error.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    console.log(selectedFile);
    setFile(selectedFile);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Промени Документ</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Име</FormLabel>
            <Input
              key={documentId}
              placeholder={
                documents.find((doc) => doc.id === documentId)?.name || ""
              }
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Опис</FormLabel>
            <Input
              key={documentId}
              placeholder={
                documents.find((doc) => doc.id === documentId)?.description ||
                ""
              }
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Прикачи датотека</FormLabel>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf"
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={updateDocument}>
            Зачувај
          </Button>
          <Button onClick={onClose}>Назад</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
