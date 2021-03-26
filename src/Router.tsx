import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateNote from './notes/Create';
import ViewNotes from './notes/List';

const Router = () => {
  return (
    <Switch>
      <Route path="/create">
        <CreateNote />
      </Route>
      <Route path="/">
        <ViewNotes />
      </Route>
    </Switch>
  );
};

export default Router;
