import _ from 'lodash';
import AppDispatcher from './../AppDispatcher';
import Store from './Store';
import Constants from './../Constants';

let _talere = [];
let _deltagere = {};

function sorter(talere) {
    return _.sortBy(talere, taler => taler.opprettet);
}

class TalereStore extends Store {
    constructor() {
        super('talerechange');
    }

    getTalere() {
        const grouped = _.groupBy(_talere, taler => taler.type);
        const innlegg = sorter(grouped.I);
        const replikker = sorter(grouped.R);

        const frittstaaendeReplikker = replikker.filter(replikk => {
            return !_.contains(innlegg.map(i => i.id), replikk.parent);
        });
        const innleggMedTilhorendeReplikker = innlegg.map(i => {
            return [i].concat(replikker.filter(r => r.parent === i.id));
        });
        return frittstaaendeReplikker.concat(_.flatten(innleggMedTilhorendeReplikker));
    }

    getGjeldendeInnlegg() {
        var current = _.head(this.getTalere());
        return current && current.type === 'I' ? current : null;
    }

    getDeltager(number) {
        return _deltagere[number];
    }

}

let _TalereStore = new TalereStore();


const ActionHandlers = {};
ActionHandlers[Constants.HENTING_OK] = (action) => {
    _talere = action.data;
    _TalereStore.emitChange();
};
ActionHandlers[Constants.HENTING_DELTAGERE_OK] = (action) => {
    _deltagere = action.data;
    _TalereStore.emitChange();
};
ActionHandlers[Constants.NY_TALER] = (action) => {
    _talere.push(action.data);
    _TalereStore.emitChange();
};
ActionHandlers[Constants.FJERN_TALER] = (action) => {
    _talere = _talere.filter(taler => taler.id != action.data);
    _TalereStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _TalereStore;