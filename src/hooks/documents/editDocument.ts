import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";

// This needs to take the user to a new screen where we open up the form, so he gets his info filled in
// The comments in the function are for whoever is making the frontend part, probably Bojan
// BUT if it's someone else, you have a example of how put works, if still cannot succeed. Ask Bojan!
const editDocument = (documentId: number) => {
  // This takes you to another route, probably the location of where we edit the document
  // At this location you will need an axios.put so that you can edit the document params
  axiosInstance
    .get(`/documents/edit/${documentId}\``)
    .then((response) => {
      console.log("Document details: ", response.data);
    })
    .catch((error) => {
      toast.error("Error viewing document: " + error);
    });
};

export default editDocument;
