"use server"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getCookies } from "./tokenHandler"
import { IUserInfo } from "@/types/user/user.interface"

export const getUserInfo = async (): Promise<IUserInfo | null> => {
    try {
        const accessToken = await getCookies("accessToken")
        if (!accessToken) return null
    

        const secret = process.env.JWT_ACCESS_SECRET
        if (!secret) {
            console.error("JWT_SECRET not set")
            return null
        }

        const verified = jwt.verify(accessToken, secret) as JwtPayload | string
        if (!verified || typeof verified === "string") return null

        const userInfo: IUserInfo = {
            email: verified.email as string,
            role: verified.role as string
        }
        
        return userInfo
    } catch (error) {
        console.error("getUserInfo error:", error)
        return null
    }
}