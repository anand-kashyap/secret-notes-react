import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateNote from './notes/Create';
import ViewNotes from './notes/List';

const Router = () => {
  return (
    <Switch>
      <Route path="/notes">
        <ViewNotes />
      </Route>
      <Route path="/add">
        <CreateNote />
      </Route>
      <Route exact path="/">
        <Redirect to="/notes" />
      </Route>
    </Switch>
  );
};

export default Router;
