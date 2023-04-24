export class EventRegister {
    constructor() {
        this.registeredFuncs = [];
    }

    onEvent(e) {
        this.registeredFuncs.forEach(i => { i.func(e); });
    }
    registerFunc(func) {
        var id = Math.random();

        this.registeredFuncs.push({ id: id, func: func });
        return () => { this.unregisterFunc(id); };
    }
    unregisterFunc(id) {
        var index = this.registeredFuncs.findIndex(i => i.id == id);
        if (index != -1) {
        }
        this.registeredFuncs.splice(index, 1);
    }
}
