import { UserResponse } from "@/dto/UserResponse";
import $api from "./index";

export default class UsersApi {
    static async getUserByLogin(login: string) {
        return await $api.get<UserResponse>(`/user`)
            .then((response) => response.data)
    }
}

