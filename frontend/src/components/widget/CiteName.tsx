import {Container, Typography} from "@mui/material";
import { CiteNameStyle } from '@/style/style';
import { Link as RouterLink } from 'react-router-dom';

const CiteName = () => {
    console.log("Render CiteName")

    return (
        <Container sx={CiteNameStyle}>
            <Typography
                    sx={{fontFamily: 'Irish Grover, cursive',
                        fontColor: 'blue',
                        fontSize: '36px',}}
                >
                    <RouterLink to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {'MusicShop'}
                    </RouterLink>
                </Typography>
        </Container>
    )
}

export default CiteName;
