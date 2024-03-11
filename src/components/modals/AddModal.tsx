import React, {useEffect, useState} from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import {Document} from "../../hooks/useDocuments";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
    // onSubmit: () => void;

}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, setDocuments }) => {
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


    const addDocument = async () => {
        try {
            const formData = new FormData();
            formData.append("name", documentName);
            formData.append("description", documentDescription);
            if (file) {
                const fileExtension = file.name.split('.').pop();
                if (fileExtension) {
                    formData.append("extension", fileExtension);
                }
                formData.append("file", file);
            }

            const response = await axiosInstance.post("/documents/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedDocumentsResponse = await axiosInstance.get<Document[]>("/documents");

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
