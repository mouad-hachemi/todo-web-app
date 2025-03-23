import { TbLogout } from "react-icons/tb";

const LogoutBtn = ({logout}) => {
    return (
        <div>
            <button
                className="fixed bottom-2 left-2 hover:cursor-pointer hover:scale-105 transition-all duration-100 ease-in
                "
                onClick={logout}
            >
                <TbLogout size={32} />
            </button>
        </div>
    );
}

export default LogoutBtn;