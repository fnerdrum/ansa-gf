import React from 'react';
import agent from 'superagent';

class LastOppDeltagere extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const file = this.refs.deltagere.getDOMNode().files[0];

        agent.post('/services/deltagere')
            .attach('deltagere', file)
            .end((err, res) => {
                if (err) throw err;
                const id = res.body.id;
                console.log('id', id);
            });
    }

    render() {
        return (
            <form className="last-opp" onSubmit={this.onSubmit}>
                <input type="file" name="deltagere" ref="deltagere"/>
                <input type="submit" name="Last opp"/>
            </form>
        )
    }
}

export default LastOppDeltagere;