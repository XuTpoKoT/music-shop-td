import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from '@/components/common/NavBar';
import ProductsPageMain from '@/components/common/ProductsPageMain';
import { BasePageStyle } from '@/style/style';
import ProfilePageMain from "../common/ProfilePageMain";

const ProfilePage = () => {
    return (
        <Container>
            <Box sx={BasePageStyle}>
                <CssBaseline />
                <NavBar/>
                <ProfilePageMain></ProfilePageMain>
            </Box>
        </Container>
        
    );
};

export default ProfilePage;
