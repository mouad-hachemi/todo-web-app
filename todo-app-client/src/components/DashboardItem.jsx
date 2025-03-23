const DashboardItem = ({ icon, title = "Tooltip", handleClick = () => { } }) => {
    return (
        <>
            <button
                className="flex items-center gap-2 mb-2 hover:scale-105 hover:cursor-pointer transition-all duration-100 ease-in"
                onClick={handleClick}
            >
                {icon}
                <span className="text-md font-bold">{title}</span>
            </button>
        </>
    );
}

export default DashboardItem;