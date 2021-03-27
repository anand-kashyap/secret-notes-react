import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

const NoteView = () => {
  const { noteId } = useParams<{ noteId: string }>();

  return <div>{noteId} opened</div>;
};

const Viewer = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:noteId`}>
        <NoteView />
      </Route>
      <Route path={match.path}>
        <h3>Select a Note to view its details here.</h3>
      </Route>
    </Switch>
  );
};

export default Viewer;
