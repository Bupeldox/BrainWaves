
export function getTime(){
    return time;
}

var time = 0;
setInterval(() => {
    time += 10;
}, 10);

