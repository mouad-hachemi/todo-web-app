import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })
            if (response.status == 201) {
                const token = await response.json();
                localStorage.setItem("token", token);
                navigate('/');
            } else {
                setInvalidCredentials(true);
                console.log(await response.json());
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="flex justify-center h-screen">
                <div className="flex justify-center flex-col">
                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={login}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                            <input
                                className={
                                    `shadow appearance-none ${invalidCredentials ? 'border border-red-500' : 'border'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
                                }
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                type="text" name='username' id="username" placeholder="Username"
                            />
                        </div>
                        <div className="mb-6">
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                            <input
                                className={
                                    `shadow appearance-none ${invalidCredentials ? 'border border-red-500' : 'border'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
                                }
                                value={password} onChange={(e) => setPassword(e.target.value)} type="password" name='password' id="password" placeholder="Enter password"
                            />
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Log in
                        </button>
                        <p className="text-sm text-center mt-2 text-gray-700">
                            Don't have an account?
                            <Link className="font-bold underline ml-0.5" to="/sign-up">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;