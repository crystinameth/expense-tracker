import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);           //transaction array

    const transactionCollectionRef = collection(db, "transactions");        //reference to the collection
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try{
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),      //where clause to get transactions of only logged in user
                orderBy("createdAt","desc")        //order by clause to get transactions in descending order
                );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                    let docs =  [];     //empty array to store transactions
                    snapshot.forEach((doc) => {     //loop through each document stored in snapshot
                        const data = doc.data();   // firebase stores data in documents in JSON format
                        const id = doc.id;         // id of the document
                        docs.push({ ...data, id });     //push data and id into docs array
                    });
                    setTransactions(docs);      //set transactions state to docs array
                })
        } catch (err) {
            console.error(err);
        }

        return () => unsubscribe();     //unsubscribe from the snapshot
    }

    useEffect(() => {
        getTransactions();                   //get transactions is async function hence we need to call it here as we cannot call async functions in useEffect directly  
    }, []);                       //empty array means it will only run once
   
    return { transactions };
}