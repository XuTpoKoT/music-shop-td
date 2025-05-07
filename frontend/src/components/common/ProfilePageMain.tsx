import {Box} from "@mui/material";
import { ProfilePageMainStyle } from "@/style/ProfileStyle";
import useUsersStore from "@/store/UsersStore";
import { ProfileInfoView } from "@/components/view/ProfileInfoView";
import { useEffect } from "react";

const ProfilePageMain = () => {
    console.log("Render ProfilePageMain")
    const userInfo = useUsersStore(((state) => state.userInfo))
    const status = useUsersStore(((state) => state.status))
    const fetchUserInfo = useUsersStore((state) => state.fetchUserInfo)

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo]);

    return (
        <Box sx={ProfilePageMainStyle}>
            <ProfileInfoView status={status} userInfo={userInfo!}></ProfileInfoView>
        </Box>
    )
}

export default ProfilePageMain;
