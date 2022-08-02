const moment = require('moment');

//formats a message so that it contains a timestamp, a message, a color
function messageFormatter(username, message, color){
    return{
        username,
        message,
        color,
        time: moment().format('h:mm: a')
    }
}

module.exports = messageFormatter;