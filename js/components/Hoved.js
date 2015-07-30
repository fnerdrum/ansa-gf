import React from 'react';
import Router from 'react-router';
import io from 'socket.io-client';

import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions'

import TalerListe from './TalerListe';
import AddTaler from './AddTaler'
import LastOppDeltagere from './LastOppDeltagere'

const Link = Router.Link;

function getState() {
    return {
        talere: TalereStore.getTalere()
    }
}

class Hoved extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        var socket = io();
        socket.on('talere-' + this.props.params.id, function (event) {
            switch (event.type) {
                case 'add':
                    Actions.nyTaler(event.data);
                    break;
                case 'remove':
                    Actions.talerFjernet(event.data);
                    break;
                case 'change':
                    Actions.talerEndret(event.data);
                    break;
            }

        });
        TalereStore.addChangeListener(this._onChange);
        var id = this.props.params.id;
        Actions.getTalere(id);
        Actions.getDeltagere(id);
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
                <AddTaler id={this.props.params.id}/>
                <TalerListe id={this.props.params.id} talere={this.state.talere}/>
                <Link to={'/:id/deltagere'} params={{id: this.props.params.id}}>Se alle deltagere</Link>
            </div>
        );
    }
}

export default Hoved;