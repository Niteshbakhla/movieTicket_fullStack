import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE } from "../config";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

            const [user, setUser] = useState(null);
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState(null);
            const [searchTerm, setSearchTerm] = useState("");
            const [movies, setMovies] = useState([]);
            const [filteredMovie, setFilteredMove] = useState([]);

            const login = async (email, password) => {
                        try {
                                    setLoading(true)
                                    setError(null)
                                    let userData = { email, password }
                                    const { data } = await axios.post(`${API_BASE}/api/auth/login`, userData, { withCredentials: true })
                                    localStorage.setItem("token", data.token)
                                    setUser(data)
                                    toast.success(data.message)

                        } catch (error) {
                                    toast.error(error.response.data.message)
                                    setError(error.response?.data?.message || "Login failed")
                        } finally {
                                    setLoading(false)
                        }
            }

            const signup = async (name, email, password, role = "user") => {
                        try {
                                    setLoading(true)
                                    setError(null)
                                    const userData = { name, email, password };
                                    const { data } = await axios.post(`${API_BASEL}/api/auth/register`, userData)
                                    setUser(data)
                                    toast.success(data.message)

                        } catch (error) {
                                    console.log(error)
                                    setError(error.response?.data?.message || "Signup Failed")
                        } finally {
                                    setLoading(false)
                        }
            }

            return (
                        <AuthContext.Provider value={{ user, login, setError, loading, error, signup, setSearchTerm, searchTerm, setMovies, movies, setFilteredMove, filteredMovie }}>
                                    {children}
                        </AuthContext.Provider>
            )
}

export const useAuth = () => useContext(AuthContext)