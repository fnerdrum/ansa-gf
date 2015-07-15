import React from 'react';
import io from 'socket.io-client';

import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions'

import TalerListe from './TalerListe';
import AddTaler from './AddTaler'
import LastOppDeltagere from './LastOppDeltagere'

function getState() {
    return {
        talere: TalereStore.getAll()
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();

        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        var socket = io();
        socket.on('taler', function(taler){
            Actions.nyTaler(taler);
        });
        TalereStore.addChangeListener(this._onChange);
        Actions.getAll();
        Actions.getDeltagere();
    }

    componentWillUnmount() {
        TalereStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState());
    }

    render() {
        return (
            <div>
                <header className="heading">
                    <img src="img/logo.png" alt="ANSA"/>
                </header>
                <LastOppDeltagere/>
                <section className="main">
                    <AddTaler/>
                    <TalerListe talere={this.state.talere}/>
                </section>
            </div>
        );
    }
}

export default App;