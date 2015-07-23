import React from 'react';
import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions';

class Taler extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        Actions.fjernTaler(this.props.id, this.props.taler);
    }
    render() {
        var taler = this.props.taler;
        var className = 'list-group-item taler ' + getTypeNavn(taler.type);
        return (
            <li className={className}>
                <p className='number'>{taler.number}</p>

                <p className='name'>{TalereStore.getDeltager(taler.number)}</p>

                <span className="glyphicon glyphicon-remove" onClick={this.remove}></span>
                <span className="glyphicon glyphicon-pencil"></span>
            </li>
        );
    }
}

const getTypeNavn = (type) => {
    switch (type) {
        case 'I':
            return 'innlegg';
        case 'R':
            return 'replikk';
        default :
            return 'ukjent';
    }
};

export default Taler;