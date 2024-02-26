// import React, { useState } from "react";
// import axios from "axios";
//
// interface Props {
//     documentId: number;
//     onClose: () => void;
// }
//
// const EditForm: React.FC<Props> = ({ documentId, onClose }) => {
//     const [documentName, setDocumentName] = useState("");
//     const [documentDescription, setDocumentDescription] = useState("");
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`/api/documents/edit/${documentId}`, {
//                 name: documentName,
//                 description: documentDescription,
//             });
//             console.log("Document updated successfully:", response.data);
//             onClose(); // Close the edit form modal or perform other actions
//         } catch (error) {
//             console.error("Error updating document:", error);
//             // Handle error (e.g., display error message to user)
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Document Name:
//                 <input
//                     type="text"
//                     value={documentName}
//                     onChange={(e) => setDocumentName(e.target.value)}
//                 />
//             </label>
//             <label>
//                 Description:
//                 <textarea
//                     value={documentDescription}
//                     onChange={(e) => setDocumentDescription(e.target.value)}
//                 />
//             </label>
//             <button type="submit">Update Document</button>
//         </form>
//     );
// };
//
// export default EditForm;
