import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  getContact,
  updateContact,
  deleteContact,
  addTelephone,
  deleteTelephone,
  addMail,
  deleteMail,
} from "../api/contacts";
import { extractFieldErrors } from "../api/api";

// Validazioni lato client (stesse regole del backend), così blocchiamo
// gli input palesemente sbagliati prima ancora di chiamare l'API.
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");

  // errori per singolo campo: { name, surname, number, mail }
  const [fieldErrors, setFieldErrors] = useState({});

  async function load() {
    try {
      setLoading(true);
      const data = await getContact(id);
      setContact(data);
      setName(data.name);
      setSurname(data.surname || "");
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleSave(e) {
    e.preventDefault();
    setFieldErrors({});
    if (!name.trim()) {
      setFieldErrors({ name: "Il nome è obbligatorio." });
      return;
    }
    try {
      await updateContact(id, { name, surname });
      load();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleAddTelephone(e) {
    e.preventDefault();
    setFieldErrors({});
    const value = number.trim();
    // 1) validazione client: niente richiesta se il formato è sbagliato
    if (!value) {
      setFieldErrors({ number: "Inserisci un numero." });
      return;
    }
    if (!PHONE_REGEX.test(value)) {
      setFieldErrors({
        number: "Numero non valido (7-20 cifre, sono ammessi + spazi - ( )).",
      });
      return;
    }
    // 2) chiamata protetta: se il backend rifiuta (es. duplicato) mostro l'errore
    try {
      await addTelephone(id, value);
      setNumber("");
      load();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleAddMail(e) {
    e.preventDefault();
    setFieldErrors({});
    const value = mail.trim();
    if (!value) {
      setFieldErrors({ mail: "Inserisci un'email." });
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setFieldErrors({ mail: "Email non valida." });
      return;
    }
    try {
      await addMail(id, value);
      setMail("");
      load();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleRemoveTelephone(telId) {
    setFieldErrors({});
    try {
      await deleteTelephone(telId);
      load();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleRemoveMail(mailId) {
    setFieldErrors({});
    try {
      await deleteMail(mailId);
      load();
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
    }
  }

  async function handleDeleteContact() {
    try {
      await deleteContact(id);
      navigate("/", { replace: true });
    } catch (err) {
      setFieldErrors(extractFieldErrors(err));
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
      <div className="alert alert-danger">Errore nel caricamento del contatto</div>
    );
  if (!contact) return null;

  return (
    <div>
      <Link to="/" className="btn btn-link ps-0 mb-2">
        ← Torna alla rubrica
      </Link>

      <h1 className="h3 mb-4">
        {contact.name} {contact.surname}
      </h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h6 text-muted mb-3">Anagrafica</h2>
          <form onSubmit={handleSave} className="row g-2">
            <div className="col">
              <input
                className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
              />
              {fieldErrors.name && (
                <div className="invalid-feedback">{fieldErrors.name}</div>
              )}
            </div>
            <div className="col">
              <input
                className={`form-control ${
                  fieldErrors.surname ? "is-invalid" : ""
                }`}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Cognome"
              />
              {fieldErrors.surname && (
                <div className="invalid-feedback">{fieldErrors.surname}</div>
              )}
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Salva
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 text-muted mb-3">Telefoni</h2>
              <ul className="list-group list-group-flush mb-3">
                {contact.telephones.map((t) => (
                  <li
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center px-0"
                  >
                    {t.number}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveTelephone(t.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddTelephone}>
                <div className="input-group has-validation">
                  <input
                    className={`form-control ${
                      fieldErrors.number ? "is-invalid" : ""
                    }`}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Nuovo numero"
                  />
                  <button className="btn btn-primary" type="submit">
                    Aggiungi
                  </button>
                  {fieldErrors.number && (
                    <div className="invalid-feedback">{fieldErrors.number}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 text-muted mb-3">Email</h2>
              <ul className="list-group list-group-flush mb-3">
                {contact.mails.map((m) => (
                  <li
                    key={m.id}
                    className="list-group-item d-flex justify-content-between align-items-center px-0"
                  >
                    {m.mail}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveMail(m.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddMail}>
                <div className="input-group has-validation">
                  <input
                    className={`form-control ${
                      fieldErrors.mail ? "is-invalid" : ""
                    }`}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Nuova email"
                  />
                  <button className="btn btn-primary" type="submit">
                    Aggiungi
                  </button>
                  {fieldErrors.mail && (
                    <div className="invalid-feedback">{fieldErrors.mail}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-danger" onClick={handleDeleteContact}>
        Elimina contatto
      </button>
    </div>
  );
}

export default Contact;
