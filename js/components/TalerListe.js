import React from 'react';
import Taler from './Taler'

class TalerListe extends React.Component {
    render() {
        return (
            <ul className='list-group'>
                {this.props.talere.map(taler => <Taler id={this.props.id} taler={taler} key={taler.id}/>)}
            </ul>
        );
    }
}

export default TalerListe;