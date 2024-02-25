//
//
//
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
//     const [filePath, setFilePath] = useState(""); // Add state for file path
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/documents/edit/${documentId}`);
//             const { name, description, filePath } = response.data; // Assuming filePath is included in the response
//             setDocumentName(name);
//             setDocumentDescription(description);
//             setFilePath(filePath); // Set file path state
//         } catch (error : any) {
//             setError(error.message);
//         }
//     };
//
//     const updateDocument = async () => {
//         try {
//             await axiosInstance.put(`/documents/edit/${documentId}`, {
//                 name: documentName,
//                 description: documentDescription,
//                 filePath: filePath // Include file path in the request
//             });
//             onClose(); // Close the modal after successful update
//         } catch (error:any) {
//             setError(error.message);
//         }
//     };
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
//                             placeholder={documentName}
//                             onChange={(e) => setDocumentName(e.target.value)}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Description</FormLabel>
//                         <Input
//                             value={documentDescription}
//                             placeholder={documentDescription}
//                             onChange={(e) => setDocumentDescription(e.target.value)}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>File Path</FormLabel>
//                         <Input type={filePath}
//                             value={filePath}
//                             accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
//                         onChange={(e) => setFilePath(e.target.value)}
//                         />
//                     </FormControl>
//                     {error && <Text color="red.500">{error}</Text>}
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


//
// import React, { useState, useEffect } from "react";
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
// import { UploaderComponent, UploadingEventArgs } from '@syncfusion/ej2-react-inputs';
// import { getUniqueID } from '@syncfusion/ej2-base';
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
//     const [filePath, setFilePath] = useState("");
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/documents/edit/${documentId}`);
//             const { name, description, filePath } = response.data;
//             setDocumentName(name);
//             setDocumentDescription(description);
//             setFilePath(filePath);
//         } catch (error : any) {
//             setError(error.message);
//         }
//     };
//
//     const updateDocument = async () => {
//         try {
//             await axiosInstance.put(`/documents/edit/${documentId}`, {
//                 name: documentName,
//                 description: documentDescription,
//                 filePath: filePath
//             });
//             onClose();
//         } catch (error:any) {
//             setError(error.message);
//         }
//     };
//
//     const onUploadBegin = (args: UploadingEventArgs) => {
//         if (args.fileData.fileSource === 'paste') {
//             const newName: string = getUniqueID(args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))) + '.png';
//             args.customFormData = [{ 'fileName': newName }];
//         }
//     };
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
//                             placeholder={documentName}
//                             onChange={(e) => setDocumentName(e.target.value)}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Description</FormLabel>
//                         <Input
//                             value={documentDescription}
//                             placeholder={documentDescription}
//                             onChange={(e) => setDocumentDescription(e.target.value)}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>File Path</FormLabel>
//                         <Input
//                             type="text"
//                             value={filePath}
//                             placeholder="File Path"
//                             onChange={(e) => setFilePath(e.target.value)}
//                         />
//                     </FormControl>
//                     <UploaderComponent
//                         autoUpload={false}
//                         asyncSettings={{
//                             removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
//                             saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
//                         }}
//                         uploading={onUploadBegin}
//                     />
//                     {error && <Text color="red.500">{error}</Text>}
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for selected file
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await axiosInstance.post('/documents/edit/${documentId}', formData);
            // Handle response as needed
            console.log(response.data);
            setFilePath(response.data.filePath); // Set file path state after upload
        } catch (error : any) {
            setError(error.message);
        }
    };

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
            window.location.reload();
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
                            placeholder={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={documentDescription}
                            placeholder={documentDescription}
                            onChange={(e) => setDocumentDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Select File</FormLabel>
                        <Input
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <Button onClick={handleUpload}>Upload File</Button>
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
