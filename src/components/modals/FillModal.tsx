import React, { useState, useEffect } from "react";
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
import downloadDocument from "../../hooks/documents/downloadDocument";
import { toast } from "react-toastify";

interface FillModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: number;
}

const FillModal: React.FC<FillModalProps> = ({
  isOpen,
  onClose,
  documentId,
}) => {
  const [pdfFormFields, setPdfFormFields] = useState<{ [key: string]: string }>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const fetchPdfFormFields = async () => {
      try {
        const response = await axiosInstance.get(
          `/documents/fields/${documentId}`
        );
        console.log(response.data.pdfFormFields);
        setPdfFormFields(response.data.pdfFormFields);
        setShowSaveButton(Object.keys(response.data.pdfFormFields).length > 0);
      } catch (error) {
        console.log(error);
        //setError("Error fetching PDF form fields", error.message);
        toast.error("Error fetching PDF form fields");
      }
    };

    if (isOpen) {
      fetchPdfFormFields();
    }
  }, [isOpen, documentId]);

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(
        `/documents/fillAndDownload/${documentId}`,
        formData,
        {
          responseType: "blob",
        }
      );
      downloadDocument(documentId);
      onClose();
      toast.success("Document filled & downloaded successfully.");
    } catch (error) {
      setError("Error updating PDF form fields");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Пополни го документот</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500">{error}</Text>}
          {Object.entries(pdfFormFields).length === 0 ? (
            <Text>Нема податоци за пополнување</Text>
          ) : (
            Object.entries(pdfFormFields).map(([fieldName, fieldValue]) => (
              <FormControl key={fieldName} mt={4}>
                <FormLabel>{fieldName}</FormLabel>
                <Input
                  value={formData[fieldName] || fieldValue}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                />
              </FormControl>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          {showSaveButton && (
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Зачувај
            </Button>
          )}
          <Button onClick={onClose}>Назад</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FillModal;
