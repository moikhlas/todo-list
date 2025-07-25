import { useState, useRef, useContext } from "react";
import editCreatContext from "./components/editCreatContext.jsx";
import useCards from "./components/remove_add_card.js";
import addLogo from './assets/addLogo.svg'
import './css/simTodo.css'
import NavBar from "./components/navBar.jsx";

import AddTodoItem from "./components/addTodoItem.jsx";
import Timer from "./components/timer.jsx";

function SimpleTodo() {

    const { setShowDetails, setIsShowDetalis, cards, creatCards } = useContext(editCreatContext)
    const { completedTask } = useCards();

    const [stat, setState] = useState(false);

    const handelFucas = useRef(null);

    const clickHandelar = () => {
        handelFucas.current.style.animation = "rotatingLogo 1s 0.25s linear"
        const container = document.getElementsByClassName("todo-item-contaner")[0];
        if (container) {
            container.style.cursor = "auto";
        }
    }


    const handleToggleDone = (idCard) => {
        creatCards(prevCards =>
            prevCards.map(card =>
                card.id === idCard ? { ...card, isDone: !card.isDone } : card
            )
        );

        completedTask(idCard)
    };

    return (
        <>
            <AddTodoItem stat={stat}
                setState={setState}
                cards={cards}
                creatCards={creatCards} />

            <NavBar />
            <div className="simple-todo-page">

                <div className="inner-contaner-todo">

                    <div className="button-contaner">

                        <button onClick={() => setState(true)} className="initial-card-creation-button">
                            <img ref={handelFucas} className="btn-img" src={addLogo} alt="AddLogo" width='80px' />
                        </button>

                    </div>

                    {
                        cards.length === 0 ? (
                            <div className="todo-item-contaner" onClick={clickHandelar}>
                                <h1 className="empty-card-contaner">Empty List</h1>
                            </div>
                        ) : (
                            <ul className="list-tasks">

                                {cards.map(card => (
                                    <li className="tasks" key={card.id}>

                                        <div className="checkbox-wrapper-43">
                                            <input onChange={() => handleToggleDone(card.id)} checked={card.isDone || false} type="checkbox" id={`cbx-43-${card.id}`} />
                                            <label htmlFor={`cbx-43-${card.id}`} className="check">
                                                <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                    <polyline points="1 9 7 14 15 4"></polyline>
                                                </svg>
                                            </label>
                                        </div>

                                        <div className="title">
                                            <h2>{card.title}</h2>
                                        </div>

                                        <div className="timer">
                                            {(card.isTime) ? <Timer card={card} /> : <h3>No Time</h3>}
                                        </div>

                                        <div className="com-btn">
                                            <button className="com-btn-itslef" onClick={() => { setIsShowDetalis(true); setShowDetails(card.id); }}>
                                                <span>INFO</span>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    );
}


export default SimpleTodo