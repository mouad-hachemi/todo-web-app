import { useState } from "react";

const EditTaskModal = ({ isOpen, onClose, handleRefresh, token, task }) => {
    if (!isOpen) return null;
    const [taskContent, setTaskContent] = useState(task.content);
    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
                <div className="w-lg bg-white p-6 rounded-lg">
                    <form
                        className="flex flex-col"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                const body = JSON.stringify({ content: taskContent });
                                await fetch('http://localhost:5000/task-edit/' + task.task_id, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                                    },
                                    body: body,
                                })
                                handleRefresh();
                                onClose();
                            } catch (error) {
                                console.error(error.message);
                            }
                        }}
                    >
                        <label className="font-bold text-lg" htmlFor="edit-task">Edit Task</label>
                        <input
                            type="text"
                            value={taskContent}
                            name="edit-task"
                            id="edit-task"
                            className="mt-2 bg-white py-2 px-2 border rounded border-gray-500 focus:outline-0 text-lg"
                            onChange={(e) => { setTaskContent(e.target.value) }}
                        />
                        <div className="flex gap-1 justify-end  mt-2">
                            <button
                                className="w-16 py-2 bg-blue-500 text-white rounded"
                                type="submit"
                            >
                                Save
                            </button>
                            <button
                                className="w-16 py-2 bg-red-500 text-white rounded"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTaskModal;