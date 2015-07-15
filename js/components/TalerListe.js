import React from 'react';
import Taler from './Taler'

class TalerListe extends React.Component {
    render() {
        return (
            <ul className='list-group'>
                {this.props.talere.map(taler => <Taler taler={taler}/>)}
            </ul>
        );
    }
}

export default TalerListe;