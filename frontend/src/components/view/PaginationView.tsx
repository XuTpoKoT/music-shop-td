import {Box, Pagination} from "@mui/material";
import { PaginationStyle } from '@/style/style';

const PaginationView = (props: {
    currentPage: number,
    totalPages: number | undefined,
    handlePageChange: (newPage: number) => void,
}) => {
    console.log("Render PaginationView")

    if (!props.totalPages) {
        return (
            <Box sx={PaginationStyle}>
                <Pagination count={1} page={1} 
                    onChange={(_, page) => props.handlePageChange(page)}/>
            </Box>
        )
    }

    return (
        <Box sx={PaginationStyle}>
            <Pagination count={props.totalPages} page={props.currentPage} 
                onChange={(_, page) => props.handlePageChange(page)}/>
        </Box>
    )
}

export default PaginationView;
