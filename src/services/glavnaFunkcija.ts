import axiosInstance from "./axios";
import { Document } from "../hooks/useDocuments";
import { DocumentFilters } from "../App";

const glavnaFunkcija = async (
  isFavorites: boolean,
  documentFilters: DocumentFilters
) => {
  try {
    var requestParamForSearch = "";
    if (documentFilters.filterText !== "") {
      requestParamForSearch = documentFilters.filterText;
    }
    requestParamForSearch = "?searchText=" + requestParamForSearch;

    console.log("tuka", requestParamForSearch);

    console.log("kategorija", documentFilters.filterCategory?.name);

    console.log("dali omileni", isFavorites);

    const response = await axiosInstance.get<Document[] | []>(
      isFavorites ? "/favourites" : "/documents" + requestParamForSearch
    );

    if (documentFilters.filterCategory && response.data.length > 0) {
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
