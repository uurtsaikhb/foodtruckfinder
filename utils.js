const moment = require('moment');

getCurrentDay = () => {
    return moment().day();
};

getCurrentTime = () => {
    return moment().format('HH:mm');
};

displayMessage = message => {
    console.log('===============================================');
    console.log(message);
    console.log('===============================================');
};

printInstruction = () => {
    console.log('-----------------------------------------------');
    console.log('|                                             |');
    console.log('|     Enter `next` to see next 10 lists       |');
    console.log('|     Enter `exit` to close application       |');
    console.log('|                                             |');
    console.log('-----------------------------------------------');
};

module.exports = {
    getCurrentDay: getCurrentDay,
    getCurrentTime: getCurrentTime,
    displayMessage: displayMessage,
    printInstruction: printInstruction
};
