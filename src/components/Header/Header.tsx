import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <div className='d-flex justify-content-between p-3'>
            <h4>Expense Tracker</h4>
            <Link to="/add" className='btn btn-primary'>Add New</Link>
        </div>
     );
}
 
export default Header;