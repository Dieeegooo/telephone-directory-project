import { apiRequest } from "./api";

// --- Contatti ---
export const getContacts = () => apiRequest("/contacts", "GET");
export const getContact = (id) => apiRequest(`/contacts/${id}`, "GET");
export const createContact = (name, surname) =>
  apiRequest("/contacts", "POST", { name, surname });
export const updateContact = (id, data) =>
  apiRequest(`/contacts/${id}`, "PUT", data);
export const deleteContact = (id) => apiRequest(`/contacts/${id}`, "DELETE");

// --- Telefoni (sotto-risorsa del contatto) ---
export const addTelephone = (contact_id, number) =>
  apiRequest("/telephones", "POST", { contact_id, number });
export const deleteTelephone = (id) => apiRequest(`/telephones/${id}`, "DELETE");

// --- Email (sotto-risorsa del contatto) ---
export const addMail = (contact_id, mail) =>
  apiRequest("/mails", "POST", { contact_id, mail });
export const deleteMail = (id) => apiRequest(`/mails/${id}`, "DELETE");