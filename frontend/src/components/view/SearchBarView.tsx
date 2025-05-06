import React from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarStyle } from '@/style/style';

const SearchBarView = (props: {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent) => void,
    value: string,
    label: string,
}) => {
    console.log("Render SearchBarView")
    console.log("value: " + props.value)
    return (
        <Box sx={SearchBarStyle}>
            <form onSubmit={props.handleSubmit}>
                <TextField
                    id="search-bar"
                    className="text"
                    onInput={props.handleInputChange}
                    label={props.label}
                    value={props.value}
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
            </form>
        </Box>
    )
}

export default SearchBarView;
