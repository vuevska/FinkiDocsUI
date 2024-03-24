import React, { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineStar,
  AiFillStar,
  AiOutlineForm,
} from "react-icons/ai";

import { Document } from "../hooks/useDocuments";

import EditModal from "./modals/EditModal";
import viewDocument from "../hooks/documents/viewDocument";
import favouriteDocument from "../hooks/documents/favouriteDocument";
import downloadDocument from "../hooks/documents/downloadDocument";
import deleteDocument from "../hooks/documents/deleteDocument";
import DeleteModal from "./modals/DeleteModal";
import axiosInstance from "../services/axios";
import FillModal from "./modals/FillModal";

interface Props {
  action: "delete" | "edit" | "view" | "download" | "favourite" | "fill";
  documentId: number;
  size: "sm" | "md" | "lg";
  padding: number;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  onClick?: () => void;
  isFavourites?: boolean;
}

const ActionButton = ({
  action,
  size,
  padding,
  documentId,
  documents,
  setDocuments,
  isFavourites,
}: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const [isFillModalOpen, setIsFillModalOpen] = useState(false);
  const handleFillButtonClick = () => {
    setIsFillModalOpen(true);
  };

  const [favorites, setFavorites] = useState<Document[]>([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axiosInstance.get<Document[]>("/favourites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [documents]);

  const handleAction = () => {
    if (action === "delete") {
      handleDeleteButtonClick();
    } else if (action === "edit") {
      handleEditButtonClick();
    } else if (action === "view") {
      viewDocument(documentId);
    } else if (action === "fill") {
      handleFillButtonClick();
    } else if (action === "favourite") {
      favouriteDocument(documentId, setDocuments, setFavorites, isFavourites);
    } else if (action === "download") {
      downloadDocument(documentId);
    }
  };

  const getIcon = () => {
    if (action === "delete") {
      return <AiOutlineDelete />;
    } else if (action === "edit") {
      return <AiOutlineEdit />;
    } else if (action === "favourite") {
      // ova proveruva dali dokumentot go ima vo listata na favorites
      // vo idnina treba da se proveruva i spored id na najaveniot korisnik
      if (favorites.length !== 0) {
        const isFav = favorites.some((fav) => fav.id === documentId);
        return isFav ? <AiFillStar /> : <AiOutlineStar />;
      } else return <AiOutlineStar />;
    } else if (action === "download") {
      return <AiOutlineDownload />;
    } else if (action === "view") {
      return <AiOutlineEye />;
    } else if (action === "fill") {
      return <AiOutlineForm />;
    }
    return <> </>;
  };

  const confirmDelete = () => {
    deleteDocument(documentId, setDocuments);
    setIsDeleteModalOpen(false);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };
  //const icon = getIcon();

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
      case "fill":
        return "Fill Document";
      default:
        return "";
    }
  };

  return (
    <>
      <IconButton
        icon={getIcon()}
        onClick={() => handleAction()}
        fontSize={size}
        padding={padding}
        aria-label={getAriaLabel(action)}
      />
      {action === "delete" && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
          confirmDelete={confirmDelete}
        />
      )}
      {action === "edit" && (
        <EditModal
          documentId={documentId}
          isOpen={isEditModalOpen}
          documents={documents}
          setDocuments={setDocuments}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {action === "fill" && (
        <FillModal
          isOpen={isFillModalOpen}
          onClose={() => setIsFillModalOpen(false)}
          documentId={documentId}
        />
      )}
    </>
  );
};

export default ActionButton;
