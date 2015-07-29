import React from 'react';
import Router from 'react-router';
import App from './components/App';
import Start from './components/Start';
import Hoved from './components/Hoved';
import Deltagere from './components/Deltagere';

const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name=":id" handler={Hoved}/>
        <Route name=":id/deltagere" handler={Deltagere}/>
        <DefaultRoute handler={Start}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body);
});