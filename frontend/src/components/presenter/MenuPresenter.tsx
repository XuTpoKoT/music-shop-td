import MenuView from '@/components/view/MenuView';
import useAuthStore from '@/store/AuthStore';
import { useNavigate } from 'react-router-dom';

const MenuPresenter = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const username = localStorage.getItem('username');
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const navigate = useNavigate()
    const onClickSignOut = () => {
        setIsAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/')
    }

    return (
        <MenuView
            isAuth={isAuth}
            onClickSignOut={onClickSignOut}
            username={username}
        ></MenuView>
    );
};

export default MenuPresenter;
