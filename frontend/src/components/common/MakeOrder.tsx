import {Box, SelectChangeEvent} from "@mui/material";
import { MakeOrderStyle } from "@/style/CartStyle";
import usePickupPointsStore from "@/store/PickupPointsStore";
import { useEffect } from "react";
import MakeOrderView from "../view/MakeOrderView";
import useOrdersStore from "@/store/OrdersStore";
import { useNavigate } from "react-router-dom";

export const MakeOrder = () => {
    const pickupPoints = usePickupPointsStore((state) => state.pickupPoints)
    const selectedPickUpPointId = usePickupPointsStore((state) => state.selectedPickUpPointId)
    const status = usePickupPointsStore((state) => state.status)
    const fetchPickupPoints = usePickupPointsStore((state) => state.fetchPickupPoints)
    const setSelectedPickUpPointId = usePickupPointsStore((state) => state.setSelectedPickUpPointId)

    const createOrder = useOrdersStore((state) => state.createOrder)
    const needSpendBonuses = useOrdersStore((state) => state.needSpendBonuses);
    const setNeedSpendBonuses = (value: boolean) =>
        useOrdersStore.setState({ needSpendBonuses: value });
    const customerId = useOrdersStore((state) => state.customerId);
    const setCustomerId = (value: number) =>
        useOrdersStore.setState({ customerId: value });
    const navigate = useNavigate()

    useEffect(() => {
        fetchPickupPoints()
    }, [fetchPickupPoints]);
    console.log("Render MakeOrder")

    const handlePickupPointChange = (event: SelectChangeEvent) => {
        console.log("handlePickupPointChange " + event.target.value)
        setSelectedPickUpPointId(event.target.value);
    }

    const handleMakeOrder = () => {
        console.log("handleMakeOrder")
        createOrder(navigate);
    }

    return (
        <MakeOrderView 
            status={status}
            pickupPoints={pickupPoints} 
            handlePickupPointChange={handlePickupPointChange}
            selectedPickUpPointId={selectedPickUpPointId}
            handleMakeOrder={handleMakeOrder}
            needSpendBonuses={needSpendBonuses}
            setNeedSpendBonuses={setNeedSpendBonuses}
            customerId={customerId}
            setCustomerId={setCustomerId}>
      </MakeOrderView>
    )
}

