const notifier = require('node-notifier');

const moment = require('moment');

const argTime = process.argv.slice(2);

const POMODORO_DURATION = argTime[0]
const BREAK_DURATION = argTime[1]

let isWorking = false;
let reminingTime = 0;

function fromattingTime(totalSecond){
    const duration = moment.duration(totalSecond, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0'); 

    return `${hours}:${minutes}:${seconds}`;
}

function startTimer(duration){
    isWorking = !isWorking;
    reminingTime = duration * 60;

    const timer = setInterval(() =>{
        reminingTime--;

        const formattedTime = fromattingTime(reminingTime);

        console.log(`${isWorking ? 'Work' : 'Break'} : ${formattedTime} `);

        if (reminingTime === 0){
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? 'Break Time' : 'Good Work',
                message: isWorking ? 'Good Break!' : 'Good Work!',
                sound: true,
                wait: true
            });
            startTimer(isWorking ? BREAK_DURATION : POMODORO_DURATION);
        }
    }, 1000);
}

startTimer(POMODORO_DURATION)