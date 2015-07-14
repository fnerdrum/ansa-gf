import React from 'react';
import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions'

import Talkers from './Talkers';
import AddTaler from './AddTaler'

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
        TalereStore.addChangeListener(this._onChange);
        Actions.getAll();
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
                <section className="main">
                    <AddTaler/>
                    <Talkers talere={this.state.talere}/>
                </section>
            </div>
        );
    }
}

export default App;