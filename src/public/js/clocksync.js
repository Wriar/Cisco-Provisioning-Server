/**
 * Update the Element to time format HH:MM:SS (12H) + AM/PM
 * @param {Element} element HTML Element
 */
function clockUpdate(element) {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12;

    //Append zero to minutes, or seconds if needed
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    const time = `${twelveHour}:${minutes}:${seconds} ${AMPM}`;
    element.innerText = time;
    return 0;
}

//Run clockUpdate every second 
setInterval(() => {
    try {
        clockUpdate(document.getElementById('clock'));
    } catch {
        //Ok if can't run, element may not exist
    }
    
}, 1000);

clockUpdate(document.getElementById('clock'));