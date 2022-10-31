import { useEffect, useState } from "react";
import IExpenseData from "../../models/IExpenseData";
import './CalculationTable.css';

type Props = {
    data: IExpenseData[]
}

const CalculationTable = ( { data } : Props ) => {

    const user1 = "Anurag Jaisingh";
    const user2 = "Vishal Jain";

    const [ user1Spent, setUser1Spent ] = useState<number>(0);
    const [ user2Spent, setUser2Spent ] = useState<number>(0);
    const [ totalSpent, setTotalSpent ] = useState<number>(0);

    useEffect( 
        () => {
            let user1TempExp = 0;
            let user2TempExp = 0;
            let totalTempSpent = 0;

            data.forEach( item => {
                totalTempSpent = totalTempSpent + item.price;
                if( item.payeeName === user1 ){
                    user1TempExp += item.price;
                } else {
                    user2TempExp += item.price;
                }
            })
            setUser1Spent( user1TempExp );
            setUser2Spent( user2TempExp );
            setTotalSpent( totalTempSpent );
        },
        [data]
    );
    
    return ( 
        <>
            <table className="calculation">
                <tbody>
                    <tr>
                        <th>Total Expenditure: </th>
                        <td>₹{totalSpent}</td>
                    </tr>
                    <tr>
                        <th>{user1} paid:</th>
                        <td>₹{user1Spent}</td>
                    </tr>
                    <tr>
                        <th>{user2} paid:</th>
                        <td>₹{user2Spent}</td>
                    </tr>
                    <tr>
                        <th>Pay { user1Spent > user2Spent ? user1 : user2 }</th>
                        <td>₹{ Math.abs( ( user1Spent - user2Spent ) / 2) }</td>
                    </tr>
                </tbody>
            </table>
        </>
     );
}
 
export default CalculationTable;