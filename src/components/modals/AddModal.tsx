import React, { useEffect, useState } from "react";
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
  Select,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Document } from "../../hooks/useDocuments";
import { Category } from "../../hooks/useCategories";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  // onSubmit: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  setDocuments,
}) => {
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const addDocument = async () => {
    try {
      if (!documentName || !documentDescription || !selectedCategory || !file) {
        setError("Пополнете ги сите полиња.");
        return;
      }

      const formData = new FormData();
      formData.append("name", documentName);
      formData.append("description", documentDescription);
      if (file) {
        const fileExtension = file.name.split(".").pop();
        if (fileExtension) {
          formData.append("extension", fileExtension);
        }
        formData.append("file", file);
      }

      if (selectedCategory !== null) {
        formData.append("category_id", String(selectedCategory));
      }

      const response = await axiosInstance.post("/documents/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedDocumentsResponse = await axiosInstance.get<Document[]>(
        "/documents"
      );

      setDocuments(updatedDocumentsResponse.data);
      onClose();
      toast.success("Document added successfully.");
    } catch (error: any) {
      setError(error.message);
      toast.error("Error adding document: " + error.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Додади Документ</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Име</FormLabel>
            <Input
              placeholder="Име"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Опис</FormLabel>
            <Input
              placeholder="Опис"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Категорија</FormLabel>
            <Select
              placeholder="Избери категорија"
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
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
          <Button colorScheme="blue" mr={3} onClick={addDocument}>
            Зачувај
          </Button>
          <Button onClick={onClose}>Откажи</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
