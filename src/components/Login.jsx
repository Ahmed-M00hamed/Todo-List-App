import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "/";
        } else {
            alert("DInvalid email or password");
        }
    };

    return (
        <form onSubmit={handleLogin} className="w-lg m-auto mt-50 p-5 border-1 border-gray-300 rounded flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">Log in</h2>
            <input
                className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  cursor-pointer"
                type="submit"
                onClick={handleLogin}
            >LogIn</button>
            <p
                className="mt-4 text-sm text-gray-600">
                Don't have an account? <Link to="/register" className="text-blue-700 underline">Create account</Link>
            </p>
        </form>
    );
}

export default Login;