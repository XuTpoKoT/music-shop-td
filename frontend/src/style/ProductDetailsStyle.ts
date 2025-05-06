export const ProductDetailsWrapperStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '1200px',
    height: '980px',
    // border: '1px solid black',
};

export const ProductDetailsReturnPanelStyle = {
    display: 'flex', 
    justifyContent: 'top', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '200px',
    height: '100%',
    py: '40px',
    // border: '1px solid green',
};

export const ProductDetailsMainStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '1000px',
    height: '100%',
    px: '50px',
    py: '50px',
    columnGap: '50px',
    // border: '1px solid black',
};

export const MainCharacteristicsBoxStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // border: '1px solid green',
};

export const AdditionalCharacteristicsBoxStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    // border: '1px solid blue',
};

export const ProductDetailsImageStyle = {
    width: '100%',
    height: '265px',
    // maxHeight: '140px',
    objectFit: 'cover' as const,
};

export const AdditionalCharacteristicsStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    px: '20px',
    rowGap: '10px',
    // border: '1px solid black',
};

export const ProductNameStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
};

export const AddToCartButtonStyle = {
    width: 'auto',
    height: 'auto',
    px: '22px',
    py: '4px',
    backgroundColor: '#ec961b',
    color: '#000',
    textTransform: 'none' as const,
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#CC9341',
    },
};

export const DescriptionBoxStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    flexDirection: 'column',
    rowGap: '5px',
    width: '100%',
    height: '100%',
    // border: '1px solid red',
};

export const CharacteristicsStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    flexDirection: 'column',
    rowGap: '5px',
    width: '100%',
    height: '100%',
    // border: '1px solid red',
};