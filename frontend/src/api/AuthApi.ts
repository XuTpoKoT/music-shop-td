import $api from ".";
import { AuthResponse } from "../dto/AuthResponse";

export default class AuthApi {

    static async signIn(login: string, password: string) {
        return await $api.post<AuthResponse>('/auth/sign-in', {login, password})
            .then(response => response.data)
    }

    static async signUp(
        email: string,
        password: string,
        firstname: string,
        surname: string,
        patronymic: string,
    ) {
        return await $api.post<AuthResponse>('/auth/sign-up', {login, password, email, firstname, surname, patronymic})
            .then(response => response.data)
    }
}

