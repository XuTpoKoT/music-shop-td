import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";
import ManufacturersApi from "@/api/ManufacturersApi";
import { ManufacturerResponse, ManufacturerResponseSchema } from "@/dto/ManufacturerResponse";

interface ManufacturersState {
    status: RequestStatus;
    manufacturers: ManufacturerResponse[] | null;
    fetchManufacturers: () => void;
}

const useManufacturerStore = create<ManufacturersState>()(
    persist(
        (set) => ({
            status: RequestStatus.Idle,
            manufacturers: null,
            fetchManufacturers: async () => {
                set({ status: RequestStatus.Loading });
                try {
                    const response = await ManufacturersApi.getManufacturers();
                    const validated = ManufacturerResponseSchema.array().parse(response);
                    set({ status: RequestStatus.Success, manufacturers: validated });
                } catch (e) {
                    const errorMsg = getServerErrorMessage(e);
                    console.error(errorMsg);
                    set({ status: RequestStatus.Error, manufacturers: null });
                    useErrorStore.setState({ errorMessage: errorMsg });
                }
            },
        }),
        {
            name: "manufacturers-storage",
            getStorage: () => sessionStorage,
        }
    )
);

export default useManufacturerStore;
