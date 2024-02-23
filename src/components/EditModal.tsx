// // EditModal.tsx
// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Text
// } from "@chakra-ui/react";
// import axiosInstance from "../services/axios";
//
// interface EditModalProps {
//     documentId: number;
//     isOpen: boolean;
//     onClose: () => void;
// }
//
// const EditModal: React.FC<EditModalProps> = ({ documentId, isOpen, onClose }) => {
//     const [documentName, setDocumentName] = useState("");
//     const [documentDescription, setDocumentDescription] = useState("");
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/documents/edit/${documentId}`);
//             const { name, description } = response.data;
//             setDocumentName(name);
//             setDocumentDescription(description);
//         } catch (error : any) {
//             setError(error.message);
//         }
//     };
//
//     const updateDocument = async () => {
//         try {
//             const updatedDocument = {
//                 name: documentName,
//                 description: documentDescription,
//                 file: null, // Include file data field with null value
//                 // Include other fields as necessary, such as permissions, etc.
//             };
//
//             await axiosInstance.put(`/documents/edit/${documentId}`, updatedDocument);
//             onClose(); // Close the modal after successful update
//         } catch (error : any) {
//             setError(error.message);
//         }
//     };
//
//
//
//     return (
//         <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>Edit Document</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody pb={6}>
//                     <FormControl>
//                         <FormLabel>Document Name</FormLabel>
//                         <Input
//                             value={documentName}
//                             onChange={(e) => setDocumentName(e.target.value)}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Description</FormLabel>
//                         <Input
//                             value={documentDescription}
//                             onChange={(e) => setDocumentDescription(e.target.value)}
//                         />
//                     </FormControl>
//                     {error && <Text color="red.500">{error}</Text>}
//
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button colorScheme="blue" mr={3} onClick={updateDocument}>
//                         Save
//                     </Button>
//                     <Button onClick={onClose}>Cancel</Button>
//                 </ModalFooter>
//             </ModalContent>
//         </Modal>
//     );
// };
//
// export default EditModal;



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
    const [filePath, setFilePath] = useState(""); // Add state for file path
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/documents/edit/${documentId}`);
            const { name, description, filePath } = response.data; // Assuming filePath is included in the response
            setDocumentName(name);
            setDocumentDescription(description);
            setFilePath(filePath); // Set file path state
        } catch (error : any) {
            setError(error.message);
        }
    };

    const updateDocument = async () => {
        try {
            await axiosInstance.put(`/documents/edit/${documentId}`, {
                name: documentName,
                description: documentDescription,
                filePath: filePath // Include file path in the request
            });
            onClose(); // Close the modal after successful update
        } catch (error:any) {
            setError(error.message);
        }
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
                        <FormLabel>File Path</FormLabel>
                        <Input type={filePath}
                            value={filePath}
                            accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                        onChange={(e) => setFilePath(e.target.value)}
                        />
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

