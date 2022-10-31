import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddNewForm from './components/AddNewForm/AddNewForm';
import DataList from './components/DataList/DataList';
import Header from './components/Header/Header';

function App() {

  const [showForm, setShowForm] = useState<boolean>( false );
  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  return (
    <div className="App">
      <Container>
        <Header openAction={handleOpen} />
        <DataList addNew={showForm}/>
        {
          showForm && (
            <AddNewForm closeAction={handleClose} />
          )
        }
      </Container>
    </div>
  );
}

export default App;
