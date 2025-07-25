import { useContext, useEffect, useState } from "react";
import EditContextTog from "./editCreatContext";
import { eachCardTime } from "./timerCalculator";
import TimerContext from "./timeContext"; // Assuming this context provides setHours etc.
import '../css/setTimer.css';

function SetTimer({stat}) {
    const { showDetails, isShowDetalis } = useContext(EditContextTog);
    const { setMinutes, setSeconds, setHours } = useContext(TimerContext); 

    // Create local state for each input field
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);

    // useEffect to initialize local state when a card is selected
    useEffect(() => {
        if ((showDetails >= 0) && isShowDetalis) {
            const value = eachCardTime.find(inx => inx.id === showDetails);
            if (value) {
                const time = value.time;
                const h = Math.floor(time / 3600);
                const m = Math.floor((time % 3600) / 60);
                const s = Math.floor(time % 60);
                setInputHours(h);
                setInputMinutes(m);
                setInputSeconds(s);
                setHours(h);
                setMinutes(m);
                setSeconds(s);
            }
        } else if (stat && !isShowDetalis) {
            // If in add mode and not editing, reset to zero
            setInputHours(0);
            setInputMinutes(0);
            setInputSeconds(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        }
    }, [showDetails, isShowDetalis, stat, setHours, setMinutes, setSeconds]);



    // Handler for hours input change
    // This updates both local state and TimerContext
    const handleHoursChange = (e) => {
        const newValue = Number(e.target.value);
        setInputHours(newValue);
        setHours(newValue);
    };

    // Handler for minutes input change
    const handleMinutesChange = (e) => {
        const newValue = Number(e.target.value);
        setInputMinutes(newValue);
        setMinutes(newValue);
    };

    // Handler for seconds input change
    const handleSecondsChange = (e) => {
        const newValue = Number(e.target.value);
        setInputSeconds(newValue);
        setSeconds(newValue);
    };

    return (
        <div className="setting-clock">
            <input
                id="hh"
                name="hh"
                onChange={handleHoursChange}
                value={inputHours} // Use local state here
                type="number"
                className="time hour"
                min={0}
                max={24}
                placeholder="hh"
            />

            <span> : </span>

            <input
                id="mm"
                name="mm"
                onChange={handleMinutesChange}
                value={inputMinutes} // Use local state here
                type="number"
                className="time minutes"
                min={0}
                max={60}
                placeholder="mm"
            />

            <span> : </span>

            <input
                id="ss"
                name="ss"
                onChange={handleSecondsChange} // Typo: This should be handleSecondsChange for the seconds input
                value={inputSeconds} // Use local state here
                type="number"
                className="time seconds"
                min={0}
                max={60}
                placeholder="ss"
            />
        </div>
    );
}

export default SetTimer;