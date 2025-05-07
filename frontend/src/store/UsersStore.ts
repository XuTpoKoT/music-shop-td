import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "@/store//ErrorStore";
import { getServerErrorMessage } from "@/api";
import { UserResponse, UserResponseSchema } from "@/dto/UserResponse";
import UsersApi from "@/api/UsersApi";

interface UserState {
    status: RequestStatus;
    userInfo: UserResponse | null;
    fetchUserInfo: () => void;
}

const useUsersStore = create<UserState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            userInfo: null,
            fetchUserInfo: async () => {
                set({status: RequestStatus.Loading})
                try {
                    const login = localStorage.getItem('username')
                    if (!login) {
                        throw new Error('No username provided');
                      }
                    const response = await UsersApi.getUserByLogin(login);
                    const validatedResponse = UserResponseSchema.parse(response)
                    set({status: RequestStatus.Success, userInfo: validatedResponse})
                } catch (e) {                    
                    const errMsg = getServerErrorMessage(e)
                    console.log(errMsg)
                    set({status: RequestStatus.Error, userInfo: null})
                    useErrorStore.setState({errorMessage: errMsg})
                }
            },
        }),
        {
            name: 'users-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useUsersStore;