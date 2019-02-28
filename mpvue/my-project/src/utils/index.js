function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

export function countDown(value, now) {
    // console.log(now, value,'value')
    if (!value) return '';
    var diff = value - now / 1000;
    // if(diff < 0) return '进行中';
    if (diff < 0) return '--：--：--';
    // var day = parseInt(diff/86400);
    // diff = diff - day * 86400;
    var hour = parseInt(diff / 3600);
    diff = diff - hour * 3600;
    var minute = parseInt(diff / 60);
    diff = diff - minute * 60;
    var second = parseInt(diff);

    return `${addZero(hour)}：${addZero(minute)}：${addZero(second)}`;
}

function addZero(num) {
    if (num <= 9) return '0' + num;
    return num;
}

// export function Trans_time_to_str(timestamp, n) {
//     timestamp = Number(timestamp);
//     if (String(timestamp).length === 10) {
//         timestamp = timestamp * 1000; //时间戳要乘1000
//     }
//     var update = new Date(timestamp);
//     var year = update.getFullYear();
//     var month = (update.getMonth() + 1 < 10) ? ('0' + (update.getMonth() + 1)) : (update.getMonth() + 1);
//     var day = (update.getDate() < 10) ? ('0' + update.getDate()) : (update.getDate());
//     var hour = (update.getHours() < 10) ? ('0' + update.getHours()) : (update.getHours());
//     var minute = (update.getMinutes() < 10) ? ('0' + update.getMinutes()) : (update.getMinutes());
//     var second = (update.getSeconds() < 10) ? ('0' + update.getSeconds()) : (update.getSeconds());
//     if (n === 1) {
//         return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
//     } else if (n === 2) {
//         return (year + '-' + month + '-' + day);
//     } else {
//         return 0;
//     }
// }

// (function() {
//     const comObj = {};
//     comObj.chuoToTimeStr = Trans_time_to_str;
//     window.prdr = comObj;
// })();

export default {
    formatNumber,
    formatTime,
    countDown
}