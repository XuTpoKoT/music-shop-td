import { ManufacturerResponse } from "@/dto/ManufacturerResponse";
import $api from ".";

export default class ManufacturersApi {

    static async getManufacturers() {
        return await $api.get<ManufacturerResponse[]>('/manufacturers')
            .then(response => response.data)
    }
}

