import React, { useState } from "react";
import {
    Box,
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
    Text
} from "@chakra-ui/react";
import axiosInstance from "../services/axios";

interface EditModalProps {
    documentId: number;
    isOpen: boolean;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ documentId, isOpen, onClose }) => {
    const [documentName, setDocumentName] = useState("");
    const [documentDescription, setDocumentDescription] = useState("");
    const [file, setFile] = useState<File | null>(null); // Add state for file
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/documents/edit/${documentId}`);
            const { name, description } = response.data;
            setDocumentName(name);
            setDocumentDescription(description);
        } catch (error : any) {
            setError(error.message);
        }
    };

    const updateDocument = async () => {
        try {
            const formData = new FormData();
            formData.append('name', documentName);
            formData.append('description', documentDescription);
            if (file) { // Only append the file if it exists
                formData.append('file', file);
            }

            const response = await axiosInstance.put(`/documents/edit/${documentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload();
            onClose(); // Close the modal after successful update
        } catch (error:any) {
            setError(error.message);
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
                <ModalHeader>Edit Document</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Document Name</FormLabel>
                        <Input
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={documentDescription}
                            onChange={(e) => setDocumentDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Upload File</FormLabel>
                        <Input type="file" onChange={handleFileChange} accept=".doc,.docx,.pdf" />
                    </FormControl>
                    {error && <Text color="red.500">{error}</Text>}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={updateDocument}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditModal;
