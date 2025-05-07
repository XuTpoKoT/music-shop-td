import $api from ".";
import { PickupPoint } from "@/dto/PickupPoint";

export default class PickupPointsApi {
    static async getPickupPoints() {
        return await $api.get<PickupPoint[]>('/pickup-points')
            .then(response => response.data)
    }
}

