import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AddNewForm from './components/AddNewForm/AddNewForm';
import DataList from './components/DataList/DataList';
import Header from './components/Header/Header';

function App() {

  return (
    <div className="App">
      <Container>
        <Switch>
          <Route path='/add'>
            <AddNewForm />
          </Route>
          <Route path="/">
            <Header/>
            <DataList/>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
