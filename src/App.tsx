import React from 'react';
import './App.css';
import Books from './components/Books/Books'
import Book from './components/Book/Book'
import AddBook from './components/AddBook/AddBook'
import EditBook from './components/EditBook/EditBook'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props =>
          (<Books />)
          }/>
        <Route exact path="/books/:id" component={Book}/>
        <Route exact path="/book/new" component={AddBook}/>
        <Route exact path="/books/:id/edit" component={EditBook} />
      </Switch>
    </Router>
  );
}

export default App;
