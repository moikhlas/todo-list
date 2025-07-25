import { createContext } from "react";

// Create a context for managing the state of editing/creating todo items
// This context will be used to share state and functions across components
const EditCreateContext = createContext();

export default EditCreateContext
