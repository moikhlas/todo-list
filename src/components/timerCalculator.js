// timerCalculator.js

// This array will store the latest time for each card
export let eachCardTime = [];

function TimerCalc(time, id) {
    // Find if an entry for this card ID already exists
    const existingCardIndex = eachCardTime.findIndex(card => card.id === id);

    if (existingCardIndex !== -1) {
        // If the card exists, update its time
        eachCardTime[existingCardIndex].time = time;
    } else {
        // If the card does not exist, add a new entry
        eachCardTime.push({
            "id": id,
            "time": time
        });
    }
    
    // Optional: You might want to return the updated array or log it for debugging
    return eachCardTime;
}

export default TimerCalc;