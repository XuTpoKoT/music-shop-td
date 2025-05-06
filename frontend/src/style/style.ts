export const BasePageStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '1200px',
    minHeight: '1060px',
    border: '1px solid black',
};

export const NavBarStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '80px',
    mx: '10px',
    px: '20px',
    // border: '3px dashed blue',
    backgroundColor: '#ec961b'
};

export const ProductsPageMainStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '980px',
    mx: 0,
    // border: '3px dashed red',
};

export const FiltersStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    // rowGap: '50px',
    width: '290px',
    height: '100%',
    pt: '50px',
    borderRight: '1px solid black',
};

export const CategoriesStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    width: '100%',
    // height: '100%',
    // mt: '',
    border: '2px dash black',
};

export const ProductsContentStyle = {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    flexDirection: 'column',
    width: '910px',
    height: '100%',
    mx: 0,
    my: 0,
    py: 0,
    // border: '2px dashed blue',
};

export const SearchBarStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '70px',
    // border: '2px solid red',
};

export const ProductsGridStyle = {
    width: '100%',
    height: '830px',
    // minHeight: '830px',
    my: 0,
    pl: '10px',
    // border: '2px solid blue',
};

export const PaginationStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '80px',
    // border: '2px solid green',
};

export const ProductCardStyle = {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    width: '195px',
    height: '250px',
    py: '20px',
    px: '15px',
    borderRadius: 2,
    backgroundColor: '#D7D7D7',
};

export const ProductImageStyle = {
    width: '100%',
    height: '100%', 
    maxHeight: '140px',
    objectFit: 'cover' as const,
};

export const ProductPriceStyle = {
    fontSize: '14px',
    color: '#000',
    fontWeight: 500,
};

export const ProductNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
};

export const AddToCartButtonStyle = {
    width: '100%',
    backgroundColor: '#ec961b',
    color: '#000',
    textTransform: 'none' as const,
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#CC9341',
    },
};

export const CiteNameStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '200px',
    height: '100%',
};

export const MenuViewStyle = {
    display: 'flex', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    height: '100%',
    columnGap: '20px',
};

export const menuBtnStyle = {
    color: 'black',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    textDecoration: 'none',
    textTransform: 'none',
};
