import React from 'react';
import {Button, Container, Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { MenuViewStyle, menuBtnStyle } from '@/style/style';

const MenuView = (props: {
    isAuth: boolean,
    username: string | null,
    onClickSignOut: () => void,
}) => {
    console.log("Render MenuView")

    return (
        <Container sx={MenuViewStyle}>
            { props.isAuth ? (<>
                <Link component={RouterLink} sx={menuBtnStyle} to={`/users/${props.username}`} className="link">
                        {'Профиль'}
                </Link>
                <Link component={RouterLink} sx={menuBtnStyle} to={`/users/${props.username}/cartItems`} className="link">
                        {'Корзина'}
                </Link>
                <Link component={RouterLink} sx={menuBtnStyle} to="/orders" className="link">
                        {'Заказы'}
                </Link>
                <Button sx={menuBtnStyle}
                    onClick={props.onClickSignOut}
                >
                    {'Выйти'}
                </Button>
                </>)
                : (
                    <Link component={RouterLink} sx={menuBtnStyle} to="/sign-in" className="link">
                            {'Войти'}
                    </Link>
                )
            }
        </Container>
    )
}

export default MenuView;
