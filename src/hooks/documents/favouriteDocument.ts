import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Document } from "../useDocuments";

// This is made to work if we have is_favourite in the db as a column to documents as
// Bojan's proposal in DC on 12.8.2023 at 12:45 (use to find message easily)

// Okay, this needs to edit the document and change the value of the column of is_favourite to 1 (true)
// By default it will be 0 (false)

interface Favourite {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}
const favouriteDocument = async (
  documentId: number,
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>,
  isFavourites?: boolean
) => {
  try {
    const response = await axiosInstance.get("/favourites");
    const favouritesList: Favourite[] = response.data;
    let found = false;
    for (let i = 0; i < favouritesList.length; i++) {
      if (favouritesList[i].id === documentId) {
        found = true;
        await axiosInstance.delete(`/favourites/remove/${documentId}`);
        if (isFavourites === true) {
          setDocuments((prevDocuments) =>
            prevDocuments.filter((doc) => doc.id !== documentId)
          );
        }

        toast.warn("Document removed from favourites.");
        break;
      }
    }
    if (!found) {
      await axiosInstance.post(`/favourites/add/${documentId}`);
      toast.success("Document added to favourites.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error adding document as favourite.");
  }
};

export default favouriteDocument;
