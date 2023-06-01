import axios from "axios"
import { Entry, NewEntry } from "../types"

const baseUrl = "http://localhost:3000/api/diaries"

export const getEntries = async() => {
    const entries = await axios.get<Entry[]>(baseUrl)
    return entries
  }

export const postEntry = async(entry: NewEntry): Promise<Entry> => {
    const {data} = await axios.post(baseUrl, entry)
    return data
}