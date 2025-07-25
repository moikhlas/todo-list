import { useState, useEffect, useContext, useRef } from "react";
import TimerCalc from "./timerCalculator";
import editCreatContext from "./editCreatContext";

function Timer({ card }) {
    // Context to get the current card details
    const { showDetails, isShowDetalis } = useContext(editCreatContext);
    
    // Using the card prop to get the time and id
    // Assuming card is passed as a prop to this component
    const timeArray = card?.time ?? [0, 0, 0, 0];
    const totalSeconds = timeArray[3];

    // Initialize time with totalSeconds
    const [time, setTime] = useState(totalSeconds);
    const intervalRef = useRef(null);

    // Effect to update 'time' state when 'totalSeconds' changes
    useEffect(() => {
        setTime(totalSeconds);
        TimerCalc(totalSeconds, card.id); // Ensures first card's time is written immediately
    }, [totalSeconds]);


    // Calculate hours, minutes, and seconds from the total time
    // This is done to display the timer in HH:MM:SS format
    const houCalc = Math.floor(time / 3600);
    const minCalc = Math.floor((time % 3600) / 60);
    const secCalc = time % 60;

    // Effect to handle the timer logic
    // This will start the timer when the card is selected and not paused
    // It will also stop the timer when the card is not selected or paused
    // Additionally, it will clear the interval when the component unmounts
    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        const isPaused = isShowDetalis && showDetails === card.id;

        // Start interval only if not paused and time is greater than 0
        if (!isPaused && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime(prev => Math.max(prev - 1, 0));
            }, 1000);
        } else if (time === 0) {
            // Clear interval if time reaches 0
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Cleanup function to clear the interval when the component unmounts or dependencies change
        // This prevents memory leaks and ensures the timer stops when not needed
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isShowDetalis, showDetails, card?.id, time]); // Added 'card?.id' and 'time' to dependencies

    TimerCalc(time, card.id)
    return (
        <h3>
            {houCalc.toString().padStart(2, "0")}:
            {minCalc.toString().padStart(2, "0")}:
            {secCalc.toString().padStart(2, "0")}
        </h3>
    );
}

export default Timer;