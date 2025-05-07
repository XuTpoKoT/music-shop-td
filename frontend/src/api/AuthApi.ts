import $api from ".";
import { AuthResponse } from "../dto/AuthResponse";

export default class AuthApi {

    static async signIn(login: string, password: string) {
        return await $api.post<AuthResponse>('/signin', {login, password})
            .then(response => response.data)
    }

    static async signUp(data: {
        login: string;
        password: string;
        email: string;
        firstname: string;
        surname: string;
        patronymic?: string;
    }) {
        return await $api
            .post<AuthResponse>('/signup', data)
            .then(response => response.data);
    }
}

