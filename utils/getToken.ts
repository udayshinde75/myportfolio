import { cookies } from "next/headers"

export const getToken = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        return token;
    } catch (error) {
        console.log("utils/getToken.ts :" + error)
        return null;
    }
    
}