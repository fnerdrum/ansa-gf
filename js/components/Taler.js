import React from 'react';
import TalereStore from './../stores/TalereStore'
import Actions from './../actions/Actions';
import EndreTaler from './EndreTaler';

class Taler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {endre: false};
        this.setState = this.setState.bind(this);
        this.change = this.change.bind(this);
        this.changeDone = this.changeDone.bind(this);
        this.remove = this.remove.bind(this);
    }

    change() {
        this.setState({endre: true});
    }

    changeDone() {
        this.setState({endre: false});
    }

    remove() {
        Actions.fjernTaler(this.props.id, this.props.taler);
    }

    render() {
        var taler = this.props.taler;
        var className = 'list-group-item taler ' + getTypeNavn(taler.type);
        if (this.state.endre) {
            return (
                <li className={className}>
                    <EndreTaler id={this.props.id} taler={taler} onSubmit={this.changeDone}/>
                </li>
            )
        } else {
            return (
                <li className={className}>
                    <span>{getTypeSymbol(taler.type)}</span>

                    <p className='number'>{taler.number}</p>

                    <p className='name'>{TalereStore.getDeltager(taler.number)}</p>

                    <span className="glyphicon glyphicon-remove" onClick={this.remove}></span>
                    <span className="glyphicon glyphicon-pencil" onClick={this.change}></span>
                </li>
            );
        }
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

const getTypeSymbol = (type) => {
    switch (type) {
        case 'I':
            return 'Ⓘ';
        case 'R':
            return 'Ⓡ';
        default:
            return 'Ⓧ';
    }
};

export default Taler;