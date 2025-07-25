import '../css/navBar.css'
import { useState, useContext } from 'react';
import EditContextTog from './editCreatContext';

function NavBar() {

    // State to control the visibility of the sidebars
    const [buttonClickDelete, setButtonClickDelete] = useState(false)
    const [buttonClickComplete, setButtonClickComplete] = useState(false)

    // Context to access completed and deleted tasks
    const { completed, deleted } = useContext(EditContextTog)

    return (
        <>
            <div className="sidebars">

                <div className={`deletedSide ${buttonClickDelete && "showBarLeft"}`}>
                    {
                        // If there are no deleted tasks, show a message
                        // Otherwise, map through the deleted tasks and display them
                        (deleted.length <= 0) ?

                            (
                                <h3>NO ITEMS</h3>
                            ) :

                            (
                                <ul className="list-tasks-deleted">
                                    {deleted.map(card => {
                                        return (<li className='card-items' key={card.id} >
                                            <div className="title-del">
                                                <h2>{card.title}</h2>
                                            </div>
                                            <div className="discription-del">
                                                <h3>{(card.isDisc ? card.discription : "NO DISCRIPTION")}</h3>
                                            </div>
                                            <div className="timer-del">
                                                {
                                                    (
                                                        card.isTime ?
                                                            <h3>{`${card.time[0].toString().padStart(2, "0")} : ${card.time[1].toString().padStart(2, "0")} : ${card.time[2].toString().padStart(2, "0")}`}</h3> :
                                                            <h3>No Time Limit</h3>
                                                    )
                                                }
                                            </div>
                                        </li>)
                                    })}
                                </ul>
                            )

                    }

                    {
                        // Close button for the deleted sidebar
                        // Clicking this will set the buttonClickDelete state to false, hiding the sidebar
                    }
                    <div className="closeXLeft">
                        <button onClick={() => setButtonClickDelete(false)
                        }>X</button>
                    </div>

                </div>

                <div className={`completedSide ${buttonClickComplete && "showBarRight"}`}>
                    {
                        // If there are no completed tasks, show a message
                        // Otherwise, map through the completed tasks and display them
                        (completed.length <= 0) ?

                            (
                                <h3>NO ITEMS</h3>
                            ) :

                            (
                                <ul className="list-tasks-deleted">
                                    {completed.map(card => {
                                        return (
                                            <li className='card-items' key={card.id} >

                                                <div className="title-com">
                                                    <h2>{card.title}</h2>
                                                </div>

                                                <div className="discription-com">
                                                    <h3>{(card.isDisc ? card.discription : "NO DISCRIPTION")}</h3>
                                                </div>

                                                <div className="timer-com">
                                                    {
                                                        (
                                                            card.isTime ?
                                                                <h3>{`${card.time[0].toString().padStart(2, "0")} : ${card.time[1].toString().padStart(2, "0")} : ${card.time[2].toString().padStart(2, "0")}`}</h3> :
                                                                <h3>No Time Limit</h3>
                                                        )
                                                    }
                                                </div>

                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                    }

                    {
                        // Close button for the completed sidebar
                        // Clicking this will set the buttonClickComplete state to false, hiding the sidebar
                    }
                    <div className="closeXRight">
                        <button onClick={() => setButtonClickComplete(false)}>X</button>
                    </div>
                </div >

            </div >

            <nav className='nav'>
                
                { /* Button to toggle the deleted tasks sidebar */}
                <div className="deleteTab">
                    <button onClick={() => {
                        setButtonClickDelete(true)
                        if (buttonClickComplete) {
                            setButtonClickComplete(false)
                        }
                    }}>Delete</button>
                </div>

                { /* Button to toggle the completed tasks sidebar */}
                <div className="completeTab">
                    <button onClick={() => {
                        setButtonClickComplete(true)

                        if (buttonClickDelete) {
                            setButtonClickDelete(false)

                        }
                    }}>Completed</button>
                </div>

            </nav>

        </>
    );
}


export default NavBar
