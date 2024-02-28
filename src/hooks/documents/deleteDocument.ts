import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Document } from "../useDocuments";

// There is a backend part for this BUT feel free to make it better, it does not use DTO right now!
const deleteDocument = (
  documentId: number,
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
) => {
  axiosInstance
    .delete(`/documents/delete/${documentId}`)
    .then((response) => {
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== documentId)
      );
      toast.success("Document deleted successfully.");
    })
    .catch((error) => {
      toast.error("Error deleting document: " + error);
    });
};

export default deleteDocument;
