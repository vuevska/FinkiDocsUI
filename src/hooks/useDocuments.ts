import useData from "./useData";

export interface Document {
    id: number;
    name: string;
    description: string;
}

const useDocuments = () => useData<Document>("/documents");

export default useDocuments;