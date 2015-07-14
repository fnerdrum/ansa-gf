import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';
import agent from 'superagent';

let Actions = {
    getAll: () => {
        agent
            .get('/services/talere')
            .end((err, res) => {
                if (err) {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_FEILET,
                        data: null
                    });
                } else {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_OK,
                        data: res.body
                    });
                }
            })
    }
};

export default Actions;