import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';
import agent from 'superagent';
import TalereStore from './../stores/TalereStore';

let Actions = {
    getDeltagere: () => {
        agent
            .get('/services/deltagere')
            .end((err, res) => {
                if (err) {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_DELTAGERE_FEILET,
                        data: null
                    });
                } else {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_DELTAGERE_OK,
                        data: res.body
                    });
                }
            })
    },

    getTalere: () => {
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
    },

    add: (input, innlegg) => {
        const split = input.trim().split(/\s+/g);
        const taler = {
            type: split[0].toUpperCase(),
            number: parseInt(split[1]),

        };
        if (taler.type === 'R') {
            var gjeldendeInnlegg = TalereStore.getGjeldendeInnlegg();
            taler.parent = gjeldendeInnlegg ? gjeldendeInnlegg.id : null;
        }
        if (taler.type && gyldigType(taler.type) && taler.number) {
            agent
            .post('/services/talere')
            .send(taler)
            .end((err) => {
                    if (err) {
                        AppDispatcher.dispatch({
                            actionType: Constants.OPPDATERING_FEILET,
                            data: null
                        });
                    } else {
                        AppDispatcher.dispatch({
                            actionType: Constants.OPPDATERING_OK,
                            data: null
                        });
                    }
                });
        } else {
            AppDispatcher.dispatch({
                actionType: Constants.UGYLDIG_INPUT,
                data: null
            });
        }
    },

    nyTaler: (taler) => {
        AppDispatcher.dispatch({
            actionType: Constants.NY_TALER,
            data: taler
        });
    }

};

const gyldigType = (type) => ['I', 'R'].some((t) => t === type);

export default Actions;