import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";

// This is really tricky and I have no idea what to do.
// I'm just winging it and hoping that I won't have to change a shit ton of logic here.
// Once we have the backend for this done, should be really easy to adapt and fix.
/* This isn't a priority now because even if it works on the backend, I have never done something like this on the frontend.
    Focus on the other stuff to work perfectly, then this will be top priority */
//TODO: Listen to BOJAN!
const downloadDocument = (documentId: number) => {
  axiosInstance
    .get(`/documents/download/${documentId}`, {
      responseType: "blob",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition
            .split(";")[1]
            .split("=")[1]
            .trim()
            .replace(/"/g, "")
        : "downloadedFile.pdf";

      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
      toast.error("Error downloading file: " + error);
    });
};

export default downloadDocument;
