import {Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import { RequestStatus } from '@/dto/RequestState';
import { PickupPoint } from '@/dto/PickupPoint';
import { MakeOrderButtonStyle, MakeOrderStyle } from '@/style/CartStyle';
import { useNavigate } from "react-router-dom";

const MakeOrderView = (props: {
    status: RequestStatus,
    pickupPoints: PickupPoint[] | null,
    handlePickupPointChange : (event: SelectChangeEvent) => void,
    selectedPickUpPointId: string | null,
    handleMakeOrder : () => void,
    needSpendBonuses: boolean;
    setNeedSpendBonuses: (value: boolean) => void;
    customerId: number | null;
    setCustomerId: (value: number) => void;
}) => {
    console.log("Render MakeOrderView")
    const isEmployee = localStorage.getItem("role") === "EMPLOYEE";

    if (props.status === RequestStatus.Idle || props.status === RequestStatus.Loading) {
        return <div>Загрузка...</div>;
    }

    if (props.status === RequestStatus.Error) {
        return <div>Ошибка загрузки данных</div>
    }

    return (
        <Box sx={MakeOrderStyle}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Пункт выдачи</InputLabel>
                <Select
                    labelId="pickup-point-label"
                    id="pickup-point-select"
                    value={props.selectedPickUpPointId || ''}
                    label="Пункт выдачи"
                    onChange={props.handlePickupPointChange}
                >
                    {props.pickupPoints?.map(pickupPoint => (
                        <MenuItem key={pickupPoint.id} value={pickupPoint.id}>
                            {pickupPoint.address}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                sx={MakeOrderButtonStyle}
                onClick={() => props.handleMakeOrder()}
            >
                Оформить заказ
            </Button>
        </Box>
    )
}

export default MakeOrderView;
