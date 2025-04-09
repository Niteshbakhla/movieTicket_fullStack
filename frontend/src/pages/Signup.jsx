import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
            const [name, setName] = useState("");
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const { signup, loading, error, setError } = useAuth();
            const navigate = useNavigate();

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        await signup(name, email, password);

                        if (!error) navigate("/signup");
            };

            return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                                    {/* Background decorative elements */}
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent pointer-events-none"></div>
                                    <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -top-48 -left-48 pointer-events-none animate-pulse"></div>

                                    <form
                                                onSubmit={handleSubmit}
                                                className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700/50 transform transition-all  duration-300"
                                    >
                                                <h2 className="text-3xl text-white font-bold mb-8 font-sans tracking-tight bg-gradient-to-r from-accent to-red-500 bg-clip-text ">
                                                            Join the Fun
                                                </h2>
                                                {error && (
                                                            <p className="text-red-400 mb-6 bg-red-900/20 p-3 rounded-lg text-sm">
                                                                        {error}
                                                            </p>
                                                )}
                                                <div className="mb-5">
                                                            <input
                                                                        type="text"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        placeholder="Enter your full name"
                                                                        className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 transition-all duration-200"
                                                                        required
                                                            />
                                                </div>
                                                <div className="mb-5">
                                                            <input
                                                                        type="email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        placeholder="Enter your email"
                                                                        className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 transition-all duration-200"
                                                                        required
                                                            />
                                                </div>
                                                <div className="mb-8">
                                                            <input
                                                                        type="password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        placeholder="Create a password"
                                                                        className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 transition-all duration-200"
                                                                        required
                                                            />
                                                </div>
                                                <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className="w-full bg-gradient-to-r from-accent to-red-600 text-white p-4 rounded-lg hover:from-red-600 hover:to-accent font-medium transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
                                                >
                                                            {loading ? (
                                                                        <span className="flex items-center justify-center">
                                                                                    <svg
                                                                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                fill="none"
                                                                                                viewBox="0 0 24 24"
                                                                                    >
                                                                                                <circle
                                                                                                            className="opacity-25"
                                                                                                            cx="12"
                                                                                                            cy="12"
                                                                                                            r="10"
                                                                                                            stroke="currentColor"
                                                                                                            strokeWidth="4"
                                                                                                ></circle>
                                                                                                <path
                                                                                                            className="opacity-75"
                                                                                                            fill="currentColor"
                                                                                                            d="M4 12a8 8 0 018-8v8z"
                                                                                                ></path>
                                                                                    </svg>
                                                                                    Signing up...
                                                                        </span>
                                                            ) : (
                                                                        "Sign Up"
                                                            )}
                                                </button>
                                                <p className="text-gray-300 mt-6 text-center text-sm">
                                                            Already have an account?{" "}
                                                            <Link onClick={() => setError(null)}
                                                                        to="/login"
                                                                        className="text-accent hover:text-red-500 font-medium transition-colors duration-200"
                                                            >
                                                                        Login
                                                            </Link>
                                                </p>
                                    </form>
                        </div>
            );
};

export default Signup;