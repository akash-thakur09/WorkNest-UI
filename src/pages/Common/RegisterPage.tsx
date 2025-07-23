import React, { useState } from "react";
import { registerService } from "../../services/authService";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const role = 'Employee'; // Assuming a default role for registration
        const currentDay = new Date();
        const year = currentDay.getFullYear();
        const month = String(currentDay.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDay.getDate()).padStart(2, '0');

        const joiningDate = `${year}-${month}-${day}`;
        // Call the register service with the user data
        registerService({ fullName, email, password, role, joiningDate })
            .then(response => {
                console.log("Registration successful:", response);
                localStorage.setItem("token", response.token); // Assuming the response contains a token
                window.location.href = "/"; // Redirect to login after successful registration
            })
            .catch(error => {
                console.error("Registration failed:", error);
                alert("Registration failed. Please try again.");
                window.location.href = "/register"; // Redirect back to register on failure
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
                        <h1 className="text-3xl font-bold m-2 mb-4 content-center">Please Register</h1>
                        <input type="text"
                            placeholder="Full Name"
                            className="border w-full p-2 m-2 rounded"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
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
                            onClick={handleRegister}
                        >
                            Sign Up
                        </button>
                        <p className="m-2">I'm already a Member <a href="/" className="text-blue-500">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RegisterPage;