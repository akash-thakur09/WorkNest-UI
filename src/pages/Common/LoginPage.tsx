import { useState } from "react";
import { loginService } from "../../services/authService";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Email:", email);
        // console.log("Password:", password);
        loginService({ email, password })
            .then(response => {
                console.log("Login successful:", response);
                localStorage.setItem("token", response.token); // Assuming the response contains a token
                window.location.href = "/dashboard"; // Redirect to dashboard after successful login
            })
            .catch(error => {
                console.error("Login failed:", error);
                alert("Login failed. Please check your credentials.");
                window.location.href = "/login"; // Redirect back to login on failure
            });
    }
    return (
        <div className="flex w-screen h-screen">
            <div className="bg-gray-500 w-1/2 h-screen">
                <h1>Employee Management Portal</h1>
            </div>
            <div className="w-1/2 h-screen flex items-center justify-center">
                <div className="flex flex-col h-2/3 w-2/3 items-center justify-center bg-red-100 rounded">
                    <div className="bg-red-200 flex flex-col h-2/3 w-2/3 items-center p-2">
                        <h1 className="text-3xl font-bold m-2 mb-4 content-center">Employee Login</h1>
                        <input type="text"
                            placeholder="Email"
                            className="border w-full p-2 m-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border w-full p-2 m-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 m-4 text-white font-bold w-25 cursor-pointer p-2 rounded"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                        <p className="m-2">Not a member? <a href="/register" className="text-blue-500">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;