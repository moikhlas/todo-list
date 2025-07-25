import '../css/addTodoItem.css'

import { useState, useContext, useEffect, useRef } from 'react'
import TimerContext from './timeContext.jsx';
import EditContextTog from './editCreatContext.jsx';
import SetTimer from './setTimer.jsx'
import useCards from './remove_add_card.js';


import TimerCalc from './timerCalculator.js';


function AddTodoItem({ cards, stat, setState, creatCards }) {

    /*============================== ====================================*/

    // Local state for timer inputs
    // These will be used to create or edit the timer for a todo item
    // They are not directly tied to the TimerContext, but can be used to update it

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [hours, setHours] = useState(0)

    /*============================== ====================================*/

    // Local state for title and description inputs
    // These will be used to create or edit the title and description of a todo item
    const { showDetails,
        isShowDetalis,
        setIsShowDetalis,
        setShowDetails,
        countCards } = useContext(EditContextTog)

    /*============================== ====================================*/

    // Local state for title and description inputs
    // These will be used to create or edit the title and description of a todo item
    const [titleVal, setTitleVal] = useState("");
    const [disVal, SetDisVal] = useState("");

    /*============================== ====================================*/

    // Function to create a new todo card
    // This function will be called when the user clicks the "Add Task" button
    const { removeTask } = useCards()

    // Function to create a new todo card
    // This function will be called when the user clicks the "Add Task" button
    // This function will create a new card with the provided title, description, and timer values
    // It will also update the global timer tracker with the total time for the card
    const CreatNewCard = () => {
        // Increment the card count to generate a unique ID
        countCards.current += 1;

        const totalTime = (hours * 3600) + (minutes * 60) + (seconds * 1);

        creatCards(prevCards => {
            const updatedCards = [
                ...prevCards,
                {
                    title: titleVal,
                    discription: disVal,
                    time: [hours, minutes, seconds, totalTime],
                    isDisc: disVal.length > 0,
                    isTime: totalTime > 0,
                    id: countCards.current,
                    remove: false,
                    completed: false
                }
            ];

            // Update the global timer tracker with the new card's total time
            // This will ensure that the timerCalculator.js keeps track of the latest time for each card
            TimerCalc(totalTime, countCards.current);
            return updatedCards;
        });
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTitleVal("");
        SetDisVal("");
    }

    /*============================== ====================================*/

    // useEffect to initialize the input fields when a card is selected
    // This will populate the fields with the card's data if a card is selected
useEffect(() => {
    const card = cards.find(c => c.id === showDetails);
    if (card) {
        setTitleVal(card.title);
        SetDisVal(card.discription);
        setHours(card.time[0]);
        setMinutes(card.time[1]);
        setSeconds(card.time[2]);
    } else {
        // Reset fields if card is not found (e.g., after deletion)
        setTitleVal("");
        SetDisVal("");
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }
}, [isShowDetalis, showDetails, cards.length]);

    /*============================== ====================================*/

    // Function to modify the current card when editing
    // This function will update the card with the new title, description, and timer values
    // It will also update the global timer tracker with the total time for the card
    // This function is called when the user clicks the "Edit Complete" button
    const modifyCurrentCard = () => {
        const totalTime = (parseInt(hours) || 0) * 3600 +
                  (parseInt(minutes) || 0) * 60 +
                  (parseInt(seconds) || 0);

        const updatedCards = cards.map((card) => {
            if (showDetails === card.id) {
                // Update the timerCalculator.js with the new total time for the card
                // This will ensure that the timerCalculator.js keeps track of the latest time for each card                
                TimerCalc(totalTime, showDetails); // update global timer tracker

                // Return the updated card with the new values
                // This will update the card in the list of cards
                return {
                    ...card,
                    title: titleVal,
                    discription: disVal,
                    time: [parseInt(hours), parseInt(minutes), parseInt(seconds), totalTime],
                    isDisc: disVal.length > 0,
                    isTime: totalTime > 0,
                    id: showDetails,
                    remove: false,
                    completed: false
                };
            }
            return card;
        });

        // Update the state with the modified cards
        // This will trigger a re-render and update the UI with the modified card
        // This will ensure that the timerCalculator.js keeps track of the latest time for each card
        // This will also clean up the input fields after editing
        creatCards(updatedCards);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTitleVal("");
        SetDisVal("");
    };

    /*============================== ====================================*/

    // Function to delete the current card when editing
    // This function will remove the card from the list of cards
    const deleteCard = () => {
        removeTask(showDetails);
    }

    /*============================== ====================================*/

    return (
        // Provide the TimerContext to the component tree
        // This will allow child components to access the timer values and functions

        <TimerContext.Provider value={
            {
                hours,
                minutes,
                seconds,
                setHours,
                setMinutes,
                setSeconds,
            }
        }>

            <div className={`item-togler ${(stat || isShowDetalis) ? "visible" : "invisible"}`}>

                <div className="inner-item-togler">
                    <div className="tit">
                        <label htmlFor="title">{isShowDetalis ? "Edit the Title: " : "Enter the Title: "}</label>
                        <input
                            id='title'
                            type="text"
                            maxLength={40}
                            value={titleVal}
                            onChange={(e) => setTitleVal(e.target.value)}
                            placeholder="Title"
                            className='input-feald'
                            required
                        />
                    </div>

                    <div className="dis">
                        <label htmlFor="description"> {isShowDetalis ?
                            "Edit the Discription(Optional):" :
                            "Enter the Discription(Optional):"
                        } </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="10"
                            cols="40"
                            value={disVal}
                            onChange={(e) => SetDisVal(e.target.value)}
                            placeholder="Enter a detailed description here..."
                            className='input-feald'
                        ></textarea>
                    </div>

                    <div className="timer-contaner">
                        <h3 id='label'> {isShowDetalis ?
                            "Edit Timer (Optional):" :
                            "Set Timer (Optional):"} </h3>
                        <SetTimer stat={stat} cards={cards} />
                    </div>

                    {/* Button to toggle the timer settings */}
                    <div className="btn-cont">
                        <button className='creatBtn'
                            onClick={() => {
                                if (isShowDetalis && showDetails >= 0) {
                                    if (titleVal.length <= 0 || hours > 24 || minutes >= 60 || seconds >= 60) {
                                        console.error("Invalid input values");
                                    } else {
                                        modifyCurrentCard();
                                        setShowDetails(null)
                                        setIsShowDetalis(false);
                                    }
                                } else {
                                    if (titleVal.length <= 0 || hours > 24 || minutes >= 60 || seconds >= 60) {
                                        console.error("Invalid input values");
                                    } else {
                                        setState(false);
                                        CreatNewCard();
                                    };
                                }
                            }}>{isShowDetalis ? "Edit Complete" : "Add Task"}</button>

                        {/* Button to delete the current card when editing */}
                        <button className='deleteBtn'
                            onClick={() => {
                                if (isShowDetalis && showDetails >= 0) {
                                    deleteCard()
                                    setShowDetails(null)
                                    setIsShowDetalis(false);
                                } else {
                                    setState(false);
                                }
                            }}>{isShowDetalis ? "Delete" : "Cancel"}</button>
                    </div>

                </div>

            </div>

        </TimerContext.Provider>
    )
}

export default AddTodoItem