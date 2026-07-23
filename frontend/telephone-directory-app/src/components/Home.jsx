import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getContacts, createContact, deleteContact } from "../api/contacts";
import { extractError, extractFieldErrors } from "../api/api";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // errore di caricamento lista
  const [fieldErrors, setFieldErrors] = useState({}); // errori inline del form nuovo contatto
  const [listError, setListError] = useState(""); // errore generico (es. eliminazione)
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function loadContacts() {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (e) {
      if (e.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setFieldErrors({});
    setListError("");
    if (!name.trim()) return;
    try {
      await createContact(name, surname);
      setName("");
      setSurname("");
      loadContacts();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleDelete(id) {
    setListError("");
    try {
      await deleteContact(id);
      loadContacts();
    } catch (err) {
      setListError(extractError(err));
    }
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger">Errore nel caricamento dei contatti</div>
    );

  return (
    <div>
      <h1 className="h3 mb-4">Rubrica</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h6 text-muted mb-3">Nuovo contatto</h2>
          <form onSubmit={handleCreate} className="row g-2">
            <div className="col">
              <input
                className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {fieldErrors.name && (
                <div className="invalid-feedback">{fieldErrors.name}</div>
              )}
            </div>
            <div className="col">
              <input
                className={`form-control ${fieldErrors.surname ? "is-invalid" : ""}`}
                placeholder="Cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {fieldErrors.surname && (
                <div className="invalid-feedback">{fieldErrors.surname}</div>
              )}
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      </div>

      {listError && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {listError}
          <button
            type="button"
            className="btn-close"
            onClick={() => setListError("")}
          />
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-muted">Nessun contatto in rubrica.</p>
      ) : (
        <ul className="list-group shadow-sm">
          {contacts.map((c) => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link to={`/contacts/${c.id}`} className="text-decoration-none">
                {c.name} {c.surname}
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(c.id)}
              >
                Elimina
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
