import { create } from "zustand";
import AuthApi from "@/api/AuthApi";
import { AuthResponse } from "@/dto/AuthResponse";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";

interface AuthState {
    status: RequestStatus;
    authInfo: AuthResponse | null;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    signIn: (email: string, password: string, navigate: (path: string) => void) => void;
    signUp: (data: {
        login: string;
        password: string;
        email: string;
        firstname: string;
        surname: string;
        patronymic?: string;
    }, navigate: (path: string) => void) => void;
}

export const extractPayload = (token: string): any => {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        throw new Error('Invalid token format');
      }
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

const useAuthStore = create<AuthState>(set => ({
    status: RequestStatus.Idle,
    authInfo: null,
    isAuth: localStorage.getItem("token") != null,
    setIsAuth: (isAuth) => set({ isAuth: isAuth }),
    signIn: async (email: string, password: string, navigate: (path: string) => void) => {
        set({status: RequestStatus.Loading})
        try {
            const response = await AuthApi.signIn(email, password)
            set({ status: RequestStatus.Success, authInfo: response, isAuth: true });
            const payload = extractPayload(response.token)
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', payload.role)
            localStorage.setItem('username', response.user.login)
            console.log('Token saved:', localStorage.getItem('token'))
            navigate('/')
        } catch (e) {                    
            const errMsg = getServerErrorMessage(e)
            console.log(errMsg)
            set({ status: RequestStatus.Error, authInfo: null });
            useErrorStore.setState({errorMessage: errMsg})
        }
    },
    signUp: async (data: {
        login: string;
        password: string;
        email: string;
        firstname: string;
        surname: string;
        patronymic?: string;
    }, navigate: (path: string) => void) => {
        set({status: RequestStatus.Loading})
        try {
            const response = await AuthApi.signUp(data)
            set({ status: RequestStatus.Success, authInfo: response, isAuth: true });
            const payload = extractPayload(response.token)
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', payload.role)
            localStorage.setItem('username', response.user.login)
            console.log('Token saved:', localStorage.getItem('token'))
            navigate('/')
        } catch (e) {                    
            const errMsg = getServerErrorMessage(e)
            console.log(errMsg)
            set({ status: RequestStatus.Error, authInfo: null });
            useErrorStore.setState({errorMessage: errMsg})
        }
    }
}));

export default useAuthStore;