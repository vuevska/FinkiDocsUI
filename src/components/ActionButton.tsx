import React from 'react';
import {IconButton} from '@chakra-ui/react';
import {
    AiOutlineDelete,
    AiOutlineDownload,
    AiOutlineEdit,
    AiOutlineEye,
    AiOutlineFolderView,
    AiOutlineStar
} from 'react-icons/ai';

import axiosInstance from '../services/axios';

import {act} from "react-dom/test-utils"; // Import icons for delete and edit actions

//@Author Bojan, ask for help if needed.
interface Props {
    action: 'delete' | 'edit' | 'view' | 'download' | 'favourite';
    documentId: number;
    size: "sm" | "md" | "lg";
    padding: number;
}

const ActionButton = ({action, size, padding, documentId}: Props) => {

    // There is a backend part for this BUT feel free to make it better, it does not use DTO right now!
    const deleteDocument = (documentId: number) => {
        axiosInstance.delete(`/documents/delete/${documentId}`)
            .then(response => {
                alert('Document deleted successfully.');
                window.location.reload();
            })
            .catch(error => {
                alert('Error deleting document: ' + error);
            });
    };
    //console.log() is here just for testing, may remove when 100% works

    // This needs to take the user to a new screen where we open up the form, so he gets his info filled in
    // The comments in the function are for whoever is making the frontend part, probably Bojan
    // BUT if it's someone else, you have a example of how put works, if still cannot succeed. Ask Bojan!
    const editDocument = (documentId: number) => {
        // This takes you to another route, probably the location of where we edit the document
        // At this location you will need an axios.put so that you can edit the document params
        axiosInstance.get(`/documents/edit/${documentId}\``)
            .then(response => {
                console.log("Document details: ", response.data);
            })
            .catch(error => {
                alert("Error viewing document: " + error);
            })
    }

    // Pretty basic, just needs to open a new window and give the user the specified document info.
    const viewDocument = (documentId: number) => {
        axiosInstance.get(`/documents/view/${documentId}`, {
            responseType: 'arraybuffer', // Must be specified that it's an arraybuffer, no idea.
        })
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

                // We apparently need to create a BLOB.
                const pdfUrl = window.URL.createObjectURL(pdfBlob);

                // Opens in a new window.
                window.open(pdfUrl, '_blank');
            })
            .catch(error => {
                console.error('Error viewing document:', error);
                alert('Error viewing document: ' + error);
            });
    };



    // This is made to work if we have is_favourite in the db as a column to documents as
    // Bojan's proposal in DC on 12.8.2023 at 12:45 (use to find message easily)

    // Okay, this needs to edit the document and change the value of the column of is_favourite to 1 (true)
    // By default it will be 0 (false)

    const favouriteDocument = (documentId: number) => {
        axiosInstance.put(`/documents/favourites/add/${documentId}`)
            .then(response => {
                alert('Document added as favourite.');
                window.location.reload();
            })
            .catch(error => {
                alert("Error adding document: " + error);
            })


     interface Favourite {
        id: number;
        name: string;
        description: string;
        categoryId: number;

    }
    const favouriteDocument = async (documentId: number) => {
        try {
            const response = await axios.get('http://localhost:8080/api/favourites');
            const favouritesList: Favourite[] = response.data;
            // if (favouritesList.length > 0) {
            //     console.log(favouritesList[0].id);
            // }
            let found=false;
            for (let i=0; i<favouritesList.length; i++){
                if (favouritesList[i].id===documentId){
                    found=true;
                    await axios.delete(`http://localhost:8080/api/favourites/remove/${documentId}`);
                    alert('Document removed from favourite.');
                    break;
                }
            }
            if (!found){
                await axios.post(`http://localhost:8080/api/favourites/add/${documentId}`);
                alert('Document added as favourite.');
            }
            window.location.reload(); // Reload the page or perform necessary actions
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding document as favourite.');
        }
    };


    // This is really tricky and I have no idea what to do.
    // I'm just winging it and hoping that I won't have to change a shit ton of logic here.
    // Once we have the backend for this done, should be really easy to adapt and fix.
    /* This isn't a priority now because even if it works on the backend, I have never done something like this on the frontend.
    Focus on the other stuff to work perfectly, then this will be top priority */
    //TODO: Listen to BOJAN!
    const downloadDocument = (documentId: number) => {
        axiosInstance.get(`/documents/download/${documentId}`, {
            responseType: "blob",
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));

                const link = document.createElement('a');
                link.href = url;

                const contentDisposition = response.headers['content-disposition'];
                const filename = contentDisposition
                    ? contentDisposition.split(';')[1].split('=')[1].trim().replace(/"/g, '')
                    : 'downloadedFile.pdf';

                link.setAttribute('download', filename);
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };


    const handleAction = () => {
        if (action === 'delete') {
            console.log('Delete action');
            deleteDocument(documentId);
        } else if (action === 'edit') {
            console.log('Edit action');
            editDocument(documentId);
        } else if (action === 'view') {
            console.log("View action");
            viewDocument(documentId);
        } else if (action === 'favourite') {
            console.log("Favourite action");
            favouriteDocument(documentId);
        }else if (action === 'download') {
            console.log("Download action");
            downloadDocument(documentId);
        }
    };

    const getIcon = () => {
        if (action === 'delete') {
            return <AiOutlineDelete/>;
        } else if (action === 'edit') {
            return <AiOutlineEdit/>;
        } else if (action === 'favourite') {
            return <AiOutlineStar/>;
        } else if (action === 'download') {
            return <AiOutlineDownload/>
        } else if (action === 'view') {
            return <AiOutlineEye/>
        }
        return <> </>;
    };
    const icon = getIcon();

    // Can be changed to use ifs, quick fix by Bojan
    const getAriaLabel = (action: string) => {
        switch (action) {
            case 'delete':
                return 'Delete Document';
            case 'edit':
                return 'Edit Document';
            case 'view':
                return 'View Document';
            case 'favourite':
                return 'Add to Favorites';
            case 'download':
                return 'Download Document'
            default:
                return '';
        }
    };

    return (
        <IconButton
            icon={icon}
            colorScheme="blue"
            onClick={handleAction}
            fontSize={size}
            padding={padding}
            aria-label={getAriaLabel(action)}
        />
    );
};

export default ActionButton;
