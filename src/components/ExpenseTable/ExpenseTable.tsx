import IExpenseData from "../../models/IExpenseData";
import './ExpenseTable.css';

type Props = {
    data: IExpenseData[]
}

const ExpenseTable = ( { data } : Props ) => {
    return ( 
        <table className="expense">
            <thead>
                <tr>
                    <th>Transaction Date</th>
                    <th>Product Purchased</th>
                    <th>Expense in Rupees (₹)</th>
                    <th>Payee Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map( item => (
                        <tr key={item.id}>
                            <td>{item.transactionDate}</td>
                            <td>{item.product}</td>
                            <td>₹{item.price}</td>
                            <td>{item.payeeName}</td>
                        </tr>
                    ) )
                }
            </tbody>
        </table>
     );
}
 
export default ExpenseTable;