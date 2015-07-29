import React from 'react';
import _ from 'lodash';

import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions'

function getState() {
    return {
        deltagere: TalereStore.getDeltagere()
    }
}

class Deltagere extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        TalereStore.addChangeListener(this._onChange);
        Actions.getDeltagere(this.props.params.id);
    }

    componentWillUnmount() {
        TalereStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getState());
    }

    render() {
        const deltagere = this.state.deltagere;
        return (
            <ul className='list-group'>
                {_.map(deltagere, (navn, nummer) => {
                    return <li key={nummer} className="list-group-item">{nummer + ': ' + navn}</li>;
                })}
            </ul>
        );
    }
}

export default Deltagere;