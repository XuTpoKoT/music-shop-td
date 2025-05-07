import { Box, Typography } from "@mui/material";
import { ProfileCharacteristicStyle, ProfileInfoStyle } from "@/style/ProfileStyle";
import { UserResponse } from "@/dto/UserResponse";
import { RequestStatus } from "@/dto/RequestState";

export const ProfileInfoView = (props: {
    status: RequestStatus;
    userInfo: UserResponse;
}) => {
    console.log("Render ProfileInfoView");

    if (props.status === RequestStatus.Idle || props.status === RequestStatus.Loading) {
        return <div>Загрузка...</div>;
    }

    if (props.status === RequestStatus.Error) {
        return <div>Ошибка загрузки данных</div>;
    }

    const { login, email, firstname, surname, patronymic } = props.userInfo;

    return (
        <Box sx={ProfileInfoStyle}>
            <Typography sx={ProfileCharacteristicStyle}>
                {`Логин: ${login}`}
            </Typography>
            <Typography sx={ProfileCharacteristicStyle}>
                {`Email: ${email}`}
            </Typography>
            <Typography sx={ProfileCharacteristicStyle}>
                {`Фамилия: ${surname}`}
            </Typography>
            <Typography sx={ProfileCharacteristicStyle}>
                {`Имя: ${firstname}`}
            </Typography>
            <Typography sx={ProfileCharacteristicStyle}>
                {`Отчество: ${patronymic}`}
            </Typography>
        </Box>
    );
};
