import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
   
    const transactionsCollection = collection(db, "transactions");

    const { userID } = useGetUserInfo();

    const addTransaction = async ({ 
        description, 
        transactionAmount, 
        transactionType
    }) => {
        await addDoc(transactionsCollection, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    };
    return { addTransaction };
};