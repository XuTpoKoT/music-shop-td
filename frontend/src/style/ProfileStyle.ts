import { Colors } from "./Colors";

export const ProfilePageMainStyle = {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '1200px',
    height: '980px',
    // border: '1px solid black',
};

export const ProfileInfoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '400px',
    height: '200px',
    mt: '50px',
    px: '20px',
    py: '10px',
    columnGap: '10px',
    border: '1px solid black',
    borderRadius: '15px',
    backgroundColor: Colors.CommonBg,
};

export const ProfileCharacteristicStyle = {
    fontSize: '16px',
    color: '#000',
    fontWeight: 500,
};
