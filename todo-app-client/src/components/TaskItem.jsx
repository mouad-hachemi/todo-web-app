import { IoRemoveCircleSharp, IoCheckmarkCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const TaskItem = ({ title, date, doneFlag, handleCheck, handleRemove, handleEdit }) => {

    return (
        <>
            <div className=" bg-white py-2 px-2 rounded-xs flex items-center mb-2">
                <h2
                    className={
                        `text-lg flex-grow ${doneFlag ? 'text-gray-500 line-through' : 'text-gray-800'
                        }`
                    }
                >
                    {title}
                </h2>
                <span className="text-sm text-gray-400 mx-2">{date}</span>
                <div className="flex gap-1">
                    <button

                        className={
                            `h-full ${doneFlag ? 'text-green-400' : 'text-gray-400'}`
                        }
                        onClick={handleCheck}
                    >
                        <div className="flex justify-center items-center">
                            <IoCheckmarkCircle className="hover:scale-125 duration-100 transition-all ease-in" size={22} />
                        </div>
                    </button>
                    {
                        !doneFlag ? <button
                            className="h-full text-yellow-400"
                            onClick={handleEdit}
                        >
                            <div className="flex justify-center items-center">
                                <MdEdit className="hover:scale-125 duration-100 transition-all ease-in" size={22} />
                            </div>
                        </button>
                            : <></>
                    }
                    <button
                        className="h-full text-red-400"
                        onClick={handleRemove}
                    >
                        <div className="flex justify-center items-center">
                            <IoRemoveCircleSharp className="hover:scale-125 duration-100 transition-all ease-in" size={22} />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TaskItem;