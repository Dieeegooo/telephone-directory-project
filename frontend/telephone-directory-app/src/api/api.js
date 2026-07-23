const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (url, method, data = null) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: method,
    headers: headers,
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch (e) {
      // corpo assente o non JSON
    }
    const error = new Error(
      errorData?.message || `Errore HTTP: ${response.status}`
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Estrae un messaggio d'errore leggibile dalla risposta del backend.
// Laravel su validazione fallita (422) restituisce { message, errors: { campo: [msg] } }.
export function extractError(err) {
  if (err?.data?.errors) {
    const first = Object.values(err.data.errors)[0];
    if (Array.isArray(first) && first.length) return first[0];
  }
  return err?.data?.message || err?.message || "Operazione non riuscita";
}

// Restituisce gli errori per singolo campo: { campo: "primo messaggio" }.
// Serve a mostrare l'errore sotto l'input giusto (es. { number: "...", mail: "..." }).
export function extractFieldErrors(err) {
  const out = {};
  const errors = err?.data?.errors;
  if (errors) {
    for (const field in errors) {
      const msgs = errors[field];
      out[field] = Array.isArray(msgs) ? msgs[0] : String(msgs);
    }
  }
  return out;
}