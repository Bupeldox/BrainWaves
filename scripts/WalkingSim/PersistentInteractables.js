import { tstreetData } from "./WorldData";



var newId = Math.random;

export default class PersistentInteractables {
    constructor() {
        this.persist = {};
    }
    setIdsOnStreetData(streetData) {
        for (var key in tstreetData) {
            var street = tstreetData[key];
            var interactables = street.interactablesList;
            interactables.forEach(i => {
                i.id = newId();
            });
        }
    }
    save(id, data) {
        this.persist[id] = data;
    }
    get(id) {
        if (!this.persist.hasOwnProperty(id)) {
            return false;
        }
        return this.persist[id];

    }
}