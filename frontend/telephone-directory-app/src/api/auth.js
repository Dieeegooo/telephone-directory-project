import { apiRequest } from "./api";

export function register(name, email, password) {
    return apiRequest("/register", "POST", { name, email, password });
}

export function login(email, password) {
    return apiRequest("/login", "POST", { email, password });
}