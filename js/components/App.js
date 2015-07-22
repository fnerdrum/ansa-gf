import React from 'react';
import Router from 'react-router';

const RouteHandler = Router.RouteHandler;

class App extends React.Component {

    render() {
        return (
            <div>
                <header className="heading">
                    <img src="/img/logo.png" alt="ANSA"/>
                </header>
                <section className="main">
                    <RouteHandler {...this.props}/>
                </section>
            </div>
        )

    }
}

export default App;