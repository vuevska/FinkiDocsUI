import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";

// Pretty basic, just needs to open a new window and give the user the specified document info.
const viewDocument = (documentId: number) => {
  axiosInstance
    .get(`/documents/view/${documentId}`, {
      responseType: "arraybuffer", // Must be specified that it's an arraybuffer, no idea.
    })
    .then((response) => {
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // We apparently need to create a BLOB.
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Opens in a new window.
      window.open(pdfUrl, "_blank");
    })
    .catch((error) => {
      console.error("Error viewing document:", error);
      toast.error("Error viewing document: " + error);
    });
};

export default viewDocument;
