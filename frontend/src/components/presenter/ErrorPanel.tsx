import {useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import { useErrorStore } from '@/store/ErrorStore';

const ErrorPanel = () => {
    const errorMessage = useErrorStore((state) => state.errorMessage);
    const setErrorMessage = useErrorStore((state) => state.setErrorMessage);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setErrorMessage(null)
    };

    useEffect(() => {
        if (errorMessage != null) {
            setSnackbarOpen(true);
        }
    }, [errorMessage]);

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default ErrorPanel;