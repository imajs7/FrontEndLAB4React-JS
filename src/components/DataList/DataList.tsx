import { useEffect, useState } from "react";
import IExpenseData from "../../models/IExpenseData";
import { getDataFromServer } from "../../services/server";
import { Spinner, Alert } from 'react-bootstrap';
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import CalculationTable from "../CalculationTable/CalculationTable";
import './DataList.css';

const DataList = () => {

    const [ expenseData, setExpenseData ] = useState<IExpenseData[]>( [] );
    const [ error, setError ] = useState<Error | null>( null );
    const [ loading, setLoading ] = useState<boolean>( true );

    useEffect( () => {
        async function getHelper() {
            try{
                const data = await getDataFromServer();
                setExpenseData( data );
            } catch ( error ) {
                setError( error as Error );
            } finally {
                setLoading( false );
            }
        }
        getHelper();
    }, []);

    return ( 
        <>
            {
                loading && (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )
            }
            {
                error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                expenseData.length > 0 ? (
                    <>
                        <div className="mb-4 scrollable">
                            <ExpenseTable data={expenseData} />
                        </div>
                        <div className="mt-4">
                            <CalculationTable data={expenseData} />
                        </div>
                    </>
                ) : (
                    <div className="m-5">
                        <p>Expense list is empty.</p>
                    </div>
                )
            }
        </>
     );
}
 
export default DataList;