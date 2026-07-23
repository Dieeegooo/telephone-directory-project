import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router";

function Login() {
    const [inputs, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...inputs, [name]: value });
    }
    async function handleSubmit(e) {
    e.preventDefault();
    try {
        const data = await login(inputs.email, inputs.password);
        localStorage.setItem("token", data.token); 
        navigate("/", { replace: true });
    } catch (error) {
        setError(true);
        console.log(error); // per ora solo un log, dopo qui mostreremo il messaggio d'errore
    }finally{
        setInput({ ...inputs , password: "" });
    }
    
}
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type="text"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login