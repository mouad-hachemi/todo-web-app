import DashboardItem from "../components/DashboardItem";
import LineDivider from "../components/LineDivider";
import { TbCalendar, TbCalendarBolt } from "react-icons/tb";

const Dashboard = ({name, handleAllTasks, handleTodayTasks}) => {
    return (
        <div className="w-48 flex-none flex flex-col py-4 px-4">
            <div>
                <h1 className="text-gray-500 font-bold text-sm">Hi,</h1>
                <h1 className="text-gray-800 font-bold text-xl">{name}</h1>
            </div>
            <LineDivider text={"Do It"} />
            <DashboardItem
                icon={<TbCalendarBolt fontSize={32} />} title="All Tasks"
                handleClick={handleAllTasks}
            />
            <DashboardItem
                icon={<TbCalendar fontSize={32} />} title="Today Tasks"
                handleClick={handleTodayTasks}
            />
        </div>
    );
}

export default Dashboard;