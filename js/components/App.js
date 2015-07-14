import React from 'react';
import Talkers from './Talkers';

class App extends React.Component {
    render() {
        return (
            <div>
                <header className="heading">
                    <img src="img/logo.png" alt="ANSA"/>
                </header>
                <section className="main">
                    <Talkers/>
                </section>
            </div>
        );
    }
}

export default App;