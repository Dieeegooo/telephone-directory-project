import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { extractError } from "../api/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const [inputs, setInput] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  function handleChange(e) {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // validazione client
    if (!inputs.name.trim()) {
      setError("Inserisci il nome.");
      return;
    }
    if (!EMAIL_REGEX.test(inputs.email.trim())) {
      setError("Inserisci un'email valida.");
      return;
    }
    if (inputs.password.length < 8) {
      setError("La password deve avere almeno 8 caratteri.");
      return;
    }

    try {
      const data = await register(inputs.name, inputs.email, inputs.password);
      authLogin(data.token);
      navigate("/", { replace: true });
    } catch (err) {
      setError(extractError(err));
      setInput({ ...inputs, password: "" });
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="card-body">
          <div className="auth-icon">✨</div>
          <h1 className="h4 text-center mb-1">Crea il tuo account</h1>
          <p className="text-muted text-center mb-4">Bastano pochi secondi</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <div className="form-text">Minimo 8 caratteri.</div>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Registrati
            </button>
          </form>

          <p className="mt-4 mb-0 text-center text-muted">
            Hai già un account? <Link to="/login">Accedi</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
