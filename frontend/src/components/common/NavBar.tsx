import React from 'react';
import {Box} from '@mui/material';

import { NavBarStyle } from '@/style/style';
import MenuPresenter from '@/components/presenter/MenuPresenter';
import CiteName from '@/components/widget/CiteName';

const NavBar = () => {
    return (
        <Box sx={NavBarStyle}>
            <CiteName></CiteName>
            <MenuPresenter></MenuPresenter>
        </Box>
    );
};

export default NavBar;
