import { useState, useRef } from "react";

import EditContextTog from "./components/editCreatContext.jsx";
import SimpleTodo from './simTodo'

import './css/App.css'



function App() {

  // State to hold the cards
  // This will be an array of objects, each representing a todo card
  // Each card object can have properties like id, title, description, isDone, etc
  // For example: { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs", isDone: false }
  // The cards state will be managed by the EditContextTog context
  // This allows us to share the cards state across components
  // and update it from anywhere in the app
  const [cards, creatCards] = useState([]);

  // Toggle between showing more details abou the card, the option ot edit 
  // or to add a new card
  // This will be managed by the EditContextTog context
  // This allows us to share the showDetails and isShowDetalis state across components
  // and update it from anywhere in the app
  // showDetails will hold the id of the card that is currently being shown
  // isShowDetalis will hold a boolean value indicating whether the details are shown or not
  const [showDetails, setShowDetails] = useState(0)
  const [isShowDetalis, setIsShowDetalis] = useState(false)

  // State to hold completed and deleted tasks
  // This will be managed by the EditContextTog context
  // This allows us to share the completed and deleted tasks state across components
  // and update it from anywhere in the app
  // completed will hold an array of ids of the completed tasks
  // deleted will hold an array of ids of the deleted tasks
  // This can be used to filter the cards or display completed/deleted tasks separately
  const [completed, setCompleted] = useState([])
  const [deleted, setDeleted] = useState([])

  // A ref to keep track of the number of cards
  // This can be useful for generating unique ids for new cards or for other purposes
  // It will not trigger a re-render when updated, so it is suitable for storing mutable
  // values that do not need to be displayed in the UI
  // It can be used to count the number of cards or to keep track of the last card id
  // This will be managed by the EditContextTog context
  // This allows us to share the countCards state across components
  const countCards = useRef(0)

  return (

    // Provide the EditContextTog context to the SimpleTodo component
    // This allows the SimpleTodo component and its children to access the context values
    <EditContextTog.Provider value={
      {
        showDetails,
        setShowDetails,
        isShowDetalis,
        setIsShowDetalis,
        completed,
        setCompleted,
        deleted,
        setDeleted,
        cards,
        creatCards,
        countCards
      }
    }>
      <div className="static-main-page">
        <SimpleTodo />
      </div>
    </EditContextTog.Provider>

  )
}

export default App