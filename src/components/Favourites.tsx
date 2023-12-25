// import React from 'react';
//
// const FavoritesList = ({ favourites, documents }) => {
//     const favoriteDocuments = documents.filter((document: { id: any; }) =>
//         favourites.includes(document.id)
//     );
//
//     return (
//         <div>
//             <h2>Favorite Documents</h2>
//             {favoriteDocuments.map((document: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
//                 <div key={document.id}>
//                     {/* Render your favorite document details here */}
//                     <p>{document.name}</p>
//                     {/* ... other document details */}
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default FavoritesList;

import React, {useEffect, useState} from 'react';
import {Link, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Heading} from '@chakra-ui/react'
import NavBar from "./NavBar";
import axios from "../services/axios";
import DocumentCard from "./DocumentCard";
import ActionButton from "./ActionButton";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import axiosInstance from "../services/axios";
import DocumentHeading from "./DocumentHeading";


const Favourites : React.FC = () => {

    interface Favourite {
        id: number;
        name: string;
        description: string;
        categoryId: number;

    }

    const [favouritesList, setFavourites] = useState<Favourite[] | []>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/favourites');
                setFavourites(response.data);
            } catch (error) {
                // Handle error if axios request fails
                console.error('Error fetching favourites:', error);
            }
        };

        fetchData();
    }, []);

    console.log(favouritesList)
    return (
        <>
            <Heading fontSize={25} marginTop={10} marginLeft={10}>
                Омилени документи</Heading>
            <TableContainer padding={10} marginTop={-5}>
                <Table variant="striped" colorScheme="blue">
                    {/* <TableCaption>Документи според категорија</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>Име на документ</Th>
                            <Th>Опис</Th>
                            <Th colSpan={5} textAlign="center">
                                Акции
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {favouritesList?.length === 0 && (
                            <Tr>
                                <Td colSpan={3} textAlign="center" fontWeight="bold">
                                    Нема документи во оваа категорија
                                </Td>
                            </Tr>
                        )}
                        {favouritesList?.map((fave) => (
                            <Tr key={fave.id}>
                                <Td>
                                    <DocumentCard
                                        key={fave.id}
                                        document={fave}
                                        name={""}
                                        description={""}
                                    />
                                </Td>
                                <Td>{fave.description}</Td>
                                <Td padding={0}>
                                    <ActionButton documentId={fave.id} size={"md"} padding={0} action={"view"}/>
                                </Td>
                                <Td padding={0}>
                                    <ActionButton documentId={fave.id} size={"md"} padding={0} action={"edit"}/>
                                </Td>
                                <Td padding={0}>
                                    <ActionButton documentId={fave.id} size={"md"} padding={0} action={"download"}/>
                                </Td>
                                <Td padding={0}>
                                    <ActionButton documentId={fave.id} size={"md"} padding={0} action={"favourite"}/>
                                </Td>
                                <Td padding={0}>
                                    <ActionButton documentId={fave.id} size={"md"} padding={0} action={"delete"}/>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </>
    );
};

export default Favourites;