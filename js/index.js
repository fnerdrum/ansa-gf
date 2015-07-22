import React from 'react';
import Router from 'react-router';
import Start from './components/Start';
import Hoved from './components/Hoved';

const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="a/:id" handler={Hoved}/>
        <DefaultRoute handler={Start} />
    </Route>
);

class App extends React.Component {

    render() {
        return (
            <div>
                <RouteHandler {...this.props}/>
            </div>
        )

    }
}

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body);
});