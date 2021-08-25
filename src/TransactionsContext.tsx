import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}


type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;


interface TransactionsContextProps{
    children: ReactNode;    
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction : (transaction: TransactionInput) => Promise<void>;
}




export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //Forma de enganar o contexto
    );

export function TransactionsProvider({children}: TransactionsContextProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(()=> {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transaction: TransactionInput){

        await api.post('/transactions', transaction);
    }
    

    

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>

            {children}

        </TransactionsContext.Provider>
        )
    }