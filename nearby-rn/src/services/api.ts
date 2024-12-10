import axios from "axios"

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3333",
  timeout: 700,
})