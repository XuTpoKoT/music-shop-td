import { create } from 'zustand';

interface SuccessState {
    msg: string | null;
    setMsg: (message: string | null) => void;
}

export const useSuccessStore = create<SuccessState>((set) => ({
    msg: null,
    setMsg: (message) => set({ msg: message }),
}));