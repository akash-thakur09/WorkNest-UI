import { useState } from "react";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ErrorMessage } from "../../components/ErrorMessage";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await loginService({ email, password });
            login(response.user, response.token);
            navigate("/home");
        } catch (error: any) {
            console.error("Login failed:", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-screen h-screen">
            {error && <ErrorMessage message={error} onClose={() => setError("")} />}
            
            <div className="bg-gray-500 w-1/2 h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Employee Management Portal</h1>
            </div>
            
            <div className="w-1/2 h-screen flex items-center justify-center">
                <div className="flex flex-col h-2/3 w-2/3 items-center justify-center bg-red-100 rounded">
                    <div className="bg-red-200 flex flex-col h-2/3 w-2/3 items-center p-2">
                        <h1 className="text-3xl font-bold m-2 mb-4 content-center">Employee Login</h1>
                        
                        <form onSubmit={handleLogin} className="w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                className="border w-full p-2 m-2 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border w-full p-2 m-2 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 m-4 text-white font-bold w-25 cursor-pointer p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>
                        
                        <p className="m-2">Not a member? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;