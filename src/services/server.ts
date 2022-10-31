import axios from 'axios';
import IExpenseData from '../models/IExpenseData';

const baseUrl = 'http://localhost:3001';

const getDataFromServer = async () => {
    try {
        const response = await axios.get( `${baseUrl}/items` );
        return response.data;
    } catch( error ) {
        console.log( error );
    }
}

const postDataToServer = async (newExpense : Omit<IExpenseData, "id">)=>{

    try {
        const response = await axios.post<IExpenseData>(
            `${baseUrl}/items`, 
            newExpense,
            {
                headers : { 'Content-Type': 'application/json' }
            }
        );
        return response.data;
    } catch( error ) {
        console.log( error );
    }

};

export { 
    getDataFromServer,
    postDataToServer
};