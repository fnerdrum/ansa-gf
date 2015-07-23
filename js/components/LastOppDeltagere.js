import React from 'react';
import agent from 'superagent';
import Router from 'react-router';

const Link = Router.Link;

class LastOppDeltagere extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {uploaded: false, id: null};
    }

    onChange(event) {
        event.preventDefault();
        const file = this.refs.deltagere.getDOMNode().files[0];

        agent.post('/services/deltagere')
            .attach('deltagere', file)
            .end((err, res) => {
                if (err) throw err;
                const id = res.body.id;
                this.setState({uploaded: true, id: id});
            });
    }

    render() {
        if (this.state.uploaded) {
            return (
                <div className="last-opp">
                    <p>
                        Følg <Link to={'/:id'} params={{id: this.state.id}}>denne linken</Link> for å starte møtet
                    </p>
                </div>
            )
        } else {
            return (
                <div className="last-opp">
                    <p>Velg en fil med delegatnummer og navn</p>

                    <form className="btn btn-default btn-lg">
                        <span>Last opp</span>
                        <input type="file" onChange={this.onChange} ref="deltagere"/>
                    </form>
                </div>
            )
        }
    }
}

export default LastOppDeltagere;