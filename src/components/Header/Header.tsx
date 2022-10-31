import { Button } from "react-bootstrap";

type Props = {
    openAction: () => any
};

const Header = ( { openAction } : Props ) => {
    return ( 
        <div className='d-flex justify-content-between align-center p-3'>
            <h4>Expense Tracker</h4>
            <Button variant="primary" onClick={openAction}>Add New</Button>
        </div>
     );
}
 
export default Header;