"use server"

import { serverFetch } from "@/lib/serverFetch"

export const getAllUser = async () => {
    try {
        const res = await serverFetch.get("/user")
        const result = await res.json()
        return result
    } catch (error) {
        console.log(error);

    }
}