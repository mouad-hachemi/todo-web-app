import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LineDivider from "../components/LineDivider";
import TaskItem from "../components/TaskItem";
import EditTaskModal from "../components/EditTaskModal";
import Dashboard from "../components/Dashboard";
import LogoutBtn from "../components/LogoutBtn";
import AddTaskForm from "../components/AddTaskForm";

const HomePage = () => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />

    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("...");
    const [label, setLabel] = useState("All Tasks");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(endpoint = "all-tasks") {
        try {
            const response = await fetch("http://localhost:5000/" + endpoint, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            });
            if (response.status == 403) navigate('/login');
            const resBody = await response.json();
            setTasks(resBody.tasks);
            setName(resBody.fullName);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="flex h-screen">
                <Dashboard
                    name={name}
                    handleAllTasks={(e) => {
                        e.preventDefault();
                        setLabel("All Tasks");
                        fetchData();
                    }}
                    handleTodayTasks={(e) => {
                        e.preventDefault();
                        setLabel("Today Tasks");
                        fetchData("today-tasks");
                    }}
                />
                <div className="flex-auto flex flex-col py-4 px-4 bg-blue-100">
                    <AddTaskForm
                        onInputChange={(e) => setNewTask(e.target.value)}
                        submitTask={async (e) => {
                            e.preventDefault();
                            try {
                                if (newTask) {
                                    const body = JSON.stringify({ content: newTask });
                                    await fetch("http://localhost:5000/create-task", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                                        body: body,
                                    });
                                    setNewTask("");
                                    setLabel("All Tasks");
                                    fetchData();
                                }
                            } catch (error) {
                                console.error(error.message);
                            }
                        }}
                        newTask={newTask}
                    />
                    <LineDivider text={label} />
                    {
                        tasks.map(
                            (task) => {
                                return (
                                    <TaskItem
                                        key={task.task_id}
                                        title={task.content}
                                        date={task.created_on.slice(0, 10).replaceAll("-", "/")} // Format Date.
                                        doneFlag={task.is_done}
                                        handleCheck={
                                            async (e) => {
                                                e.preventDefault();
                                                try {
                                                    const body = JSON.stringify({ doneFlag: !task.is_done });
                                                    await fetch("http://localhost:5000/task-done/" + task.task_id, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                                                        },
                                                        body: body,
                                                    });
                                                    fetchData();
                                                } catch (error) {
                                                    console.error(error.message);
                                                }
                                            }
                                        }
                                        handleRemove={
                                            async (e) => {
                                                e.preventDefault();
                                                try {
                                                    await fetch("http://localhost:5000/task-remove/" + task.task_id, {
                                                        method: "DELETE",
                                                        headers: {
                                                            'Content-Type': 'application/json', "Authorization": `Bearer ${token}`
                                                        }
                                                    });
                                                    fetchData();
                                                } catch (error) {
                                                    console.error(error.message);
                                                }
                                            }
                                        }
                                        handleEdit={
                                            (e) => {
                                                setCurrentTask(task);
                                                setIsModalOpen(true);
                                            }
                                        }
                                    />
                                );
                            }
                        )
                    }
                </div>
                <LogoutBtn
                    logout={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                />
                <EditTaskModal
                    task={currentTask}
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false) }}
                    handleRefresh={fetchData}
                    token={token}
                />
            </div>
        </>
    );
}

export default HomePage;