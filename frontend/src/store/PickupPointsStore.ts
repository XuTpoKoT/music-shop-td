import { create } from "zustand";
import { persist } from "zustand/middleware";
import PickupPointsApi from "@/api/PickupPointsApi";
import { PickupPoint } from "@/dto/PickupPoint";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";

interface PickupPointsState {
    status: RequestStatus;
    pickupPoints: PickupPoint[] | null;
    selectedPickUpPointId: number | null;
    fetchPickupPoints: () => void;
    setSelectedPickUpPointId: (id: number) => void,
}

const usePickupPointsStore = create<PickupPointsState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            pickupPoints: null,
            selectedPickUpPointId: null,
            fetchPickupPoints: async () => {
                set({ status: RequestStatus.Loading });
                try {
                    const response = await PickupPointsApi.getPickupPoints();
                    set({ status: RequestStatus.Success, pickupPoints: response });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e);
                    console.log(errMsg);
                    set({ status: RequestStatus.Error, pickupPoints: null });
                    useErrorStore.setState({ errorMessage: errMsg });
                }
            },
            setSelectedPickUpPointId: (id: string) => set({ selectedPickUpPointId: id }),
        }),
        {
            name: 'pickup-points-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default usePickupPointsStore;
