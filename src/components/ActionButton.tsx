import React, { useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@chakra-ui/react";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineStar,
} from "react-icons/ai";

import { Document } from "../hooks/useDocuments";

import EditModal from "./EditModal";
import viewDocument from "../hooks/documents/viewDocument";
import favouriteDocument from "../hooks/documents/favouriteDocument";
import downloadDocument from "../hooks/documents/downloadDocument";
import deleteDocument from "../hooks/documents/deleteDocument";

//@Author Bojan, ask for help if needed.
interface Props {
  action: "delete" | "edit" | "view" | "download" | "favourite";
  documentId: number;
  size: "sm" | "md" | "lg";
  padding: number;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  onClick?: () => void;
}

const ActionButton = ({
  action,
  size,
  padding,
  documentId,
  setDocuments,
}: Props) => {
  // There is a backend part for this BUT feel free to make it better, it does not use DTO right now!
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const handleAction = () => {
    if (action === "delete") {
      console.log("Delete action");
      deleteDocument(documentId, setDocuments);
    } else if (action === "edit") {
      console.log("Edit action");
      // editDocument(documentId);
      handleEditButtonClick();
    } else if (action === "view") {
      console.log("View action");
      viewDocument(documentId);
    } else if (action === "favourite") {
      console.log("Favourite action");
      favouriteDocument(documentId, setDocuments);
    } else if (action === "download") {
      console.log("Download action");
      downloadDocument(documentId);
    }
  };

  const getIcon = () => {
    if (action === "delete") {
      return <AiOutlineDelete />;
    } else if (action === "edit") {
      return <AiOutlineEdit />;
    } else if (action === "favourite") {
      return <AiOutlineStar />;
    } else if (action === "download") {
      return <AiOutlineDownload />;
    } else if (action === "view") {
      return <AiOutlineEye />;
    }
    return <> </>;
  };

  const confirmDelete = () => {
    deleteDocument(documentId, setDocuments);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const icon = getIcon();

  // Can be changed to use ifs, quick fix by Bojan
  const getAriaLabel = (action: string) => {
    switch (action) {
      case "delete":
        return "Delete Document";
      case "edit":
        return "Edit Document";
      case "view":
        return "View Document";
      case "favourite":
        return "Add to Favorites";
      case "download":
        return "Download Document";
      default:
        return "";
    }
  };

  return (
    <>
      <>
        <IconButton
          icon={getIcon()}
          onClick={action === "delete" ? handleDelete : () => handleAction()}
          fontSize={size}
          padding={padding}
          aria-label={getAriaLabel(action)}
        />
        {action === "edit" && (
          <EditModal
            documentId={documentId}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Отстрани Документ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Дали си сигурен дека сакаш да го отстраниш овој документ?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmDelete}>
              Отстрани
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Назад
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionButton;
