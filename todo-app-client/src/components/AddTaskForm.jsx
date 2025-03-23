import { useState } from "react";

const AddTaskForm = ({ onInputChange, submitTask, newTask }) => {
    return (
        <form
            className="flex mb-1"
            onSubmit={submitTask}
        >
            <input
                className="flex-grow
                            bg-white py-2 px-2 rounded-l-sm
                            border-gray-500 focus:outline-0 text-lg"
                type="text" name="task-desc" id="task-desc"
                placeholder="What's on your mind today?"
                value={newTask}
                onChange={onInputChange}
            />
            <button
                className="flex-shrink px-6 bg-blue-500
                            rounded-r-sm text-white hover:cursor-pointer"
                type="submit"
            >
                Add
            </button>
        </form>
    );
}

export default AddTaskForm;