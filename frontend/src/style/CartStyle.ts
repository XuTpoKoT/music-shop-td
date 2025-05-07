import { Colors } from "./Colors";

export const CartPageMainStyle = {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    width: '100%',
    minHeight: '980px',
    mx: 0,
    pl: '150px',
    pr: '100px',
    columnGap: '30px',
    backgroundColor: Colors.LightGray,
    // border: '3px dashed red',
};

export const CartTableStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    rowGap: '10px',
    width: '600px',
    height: '100%',
    pt: '50px',
    // border: '1px solid black',
};

export const CartItemWrapperStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '600px',
    height: '200px',
    py: '20px',
    px: '20px',
    borderRadius: 3,
    backgroundColor: Colors.CommonBg,
};

export const CartItemContentStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
    columpGap: '30px',
    backgroundColor: Colors.CommonBg,
    // border: '3px solid green',
};

export const CartItemInfoStyle = {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    width: '350px',
    height: '100%',
    columnGap: '20px',
    rowGap: '20px',
    backgroundColor: Colors.CommonBg,
    // border: '1px dashed red',
};

export const CartItemNamePriceBoxStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    width: 'auto',
    height: '50px',
    columpGap: '10px',
    backgroundColor: Colors.CommonBg,
    // border: '1px dashed red',
};

export const CartItemImageStyle = {
    width: '105px',
    height: '105px',
    objectFit: 'cover' as const,
};

export const CartItemActionsBoxStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '250px',
    height: '30px',
    columpGap: '15px',
    backgroundColor: Colors.CommonBg,
};

export const MakeOrderStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'center',
    // rowGap: '50px',
    width: '320px',
    height: '150px',
    mt: '50px',
    py: '15px',
    px: '10px',
    backgroundColor: Colors.CommonBg,
    borderRadius: '10px',
    border: '1px solid green',
};

export const MakeOrderButtonStyle = {
    width: 'auto',
    height: 'auto',
    px: '22px',
    py: '8px',
    backgroundColor: Colors.Orange,
    color: '#000',
    textTransform: 'none' as const,
    borderRadius: '15px',
    '&:hover': {
        backgroundColor: '#CC9341',
    },
};