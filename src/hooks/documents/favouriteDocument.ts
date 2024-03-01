import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Document } from "../useDocuments";

interface Favourite {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}
const favouriteDocument = async (
  documentId: number,
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>,
  setFavorites: React.Dispatch<React.SetStateAction<Document[]>>,
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
  } finally {
    await axiosInstance
      .get<Document[]>("/favourites")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }
};

export default favouriteDocument;
