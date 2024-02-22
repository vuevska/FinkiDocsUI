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
    useDisclosure,
    Text // Make sure to import Text component
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axios";

interface EditModalProps {
    documentId: number;
    onClick: () => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ documentId, onClose }) => {
    const [documentDetails, setDocumentDetails] = useState<any>(null); // Set initial state as 'null'
    const [error, setError] = useState<string | null>(null); // Specify type for error state

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.put(`/documents/edit/${documentId}`);
    //             setDocumentDetails(response.data);
    //         } catch (error: any) { // Specify 'any' type for the error variable
    //             setError(error.message); // Set error message
    //         }
    //     };
    //     fetchData();
    // }, [documentId]);

    return (
        <Modal isOpen={false} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Промени Документ</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {documentDetails && (
                        <>
                            <FormControl>
                                <FormLabel>Document name</FormLabel>
                                <Input defaultValue={documentDetails.name} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input defaultValue={documentDetails.description} />
                            </FormControl>
                        </>
                    )}
                    {error && <Text>Error: {error}</Text>}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditModal;
