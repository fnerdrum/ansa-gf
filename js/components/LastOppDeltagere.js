import React from 'react';

class LastOppDeltagere extends React.Component {
    render() {
        return (
            <form className="last-opp" method="post" encType="multipart/form-data" action="/services/deltagere">
                <input type="file" name="deltagere"/>
                <input type="submit" name="Last opp"/>
            </form>
        )
    }
}

export default LastOppDeltagere;