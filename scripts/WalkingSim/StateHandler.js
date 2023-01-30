
export const stateHandler = {
    getState(ref){
        var dataString = window.localStorage.getItem("walkingSimStateStore");
        if(!dataString){
            return;
        }
        var storedDat = JSON.parse(dataString);
        if(!storedDat.hasOwnProperty(ref)){
            return;
        }
        return storedDat[ref];
    },
    setState(ref,data){
        var datString = window.localStorage.getItem("walkingSimStateStore");
        
        if(!datString){
            var dat = {};
        }else{   
            var dat = JSON.parse(datString);
        }

        dat[ref] = data;

        window.localStorage.setItem("walkingSimStateStore",JSON.stringify(dat));
    }
};