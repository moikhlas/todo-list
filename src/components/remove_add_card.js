import { useContext } from "react";
import EditContextTog from "./editCreatContext";

function useCards() {

    const { cards, setCompleted, setDeleted, creatCards } = useContext(EditContextTog);

    // Function to mark a task as completed
    // This updates the cards state and moves the completed task to a separate list
    const completedTask = (id) => {
        const completed = cards.filter(card => card.id === id);
        setCompleted(prev => [...prev, ...completed]);

        creatCards(prev => prev.filter(card => card.id !== id));
    };

    // Function to remove a task
    // This updates the cards state and adds the removed task to a deleted list
    const removeTask = (id) => {
        const removed = cards.filter(card => card.id === id);
        setDeleted(prev => [...prev, ...removed]);

        creatCards(prev => prev.filter(card => card.id !== id));
    };

    return { completedTask, removeTask };
}

export default useCards;
