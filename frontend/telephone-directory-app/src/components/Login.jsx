import { useState } from "react";
import { login } from "../api/auth";

function Login() {
    const [inputs, setInput] = useState({ email: "", password: "" });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...inputs, [name]: value });
    }
    return (
        <>
            <form>
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
                        type="text"
                        name="password"
                        value={inputs.lastname}
                        onChange={handleChange}
                    />
                </label>
                <p>Current values: {inputs.firstname} {inputs.lastname}</p>
            </form>
        </>
    )
}

export default Login