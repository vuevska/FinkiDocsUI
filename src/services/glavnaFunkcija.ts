import axiosInstance from "./axios";
import { Document } from "../hooks/useDocuments";
import { DocumentFilters } from "../App";

const glavnaFunkcija = async (
  isFavorites: boolean,
  documentFilters: DocumentFilters
) => {
  try {
    const response = await axiosInstance.get<Document[] | []>(
      isFavorites ? "/favourites" : "/documents"
    );

    if (documentFilters.filterCategory) {
      const filteredDocuments = response.data.filter(
        (doc) => doc.categoryId === documentFilters.filterCategory?.id
      );
      response.data = filteredDocuments;
    }

    return response;
  } catch (error) {
    console.error(
      `Error fetching ${isFavorites ? "favorites" : "documents"}:`,
      error
    );
    //setError(`Error fetching ${isFavorites ? "favorites" : "documents"}.`);
  } finally {
    //setIsLoading(false);
  }
};

export default glavnaFunkcija;
