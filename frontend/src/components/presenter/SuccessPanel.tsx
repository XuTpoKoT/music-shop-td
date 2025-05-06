import {useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import { useSuccessStore } from '@/store/SuccessStore';

const SuccessPanel = () => {
    const msg = useSuccessStore((state) => state.msg);
    const setmsg = useSuccessStore((state) => state.setMsg);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setmsg(null)
    };

    useEffect(() => {
        if (msg != null) {
            setSnackbarOpen(true);
        }
    }, [msg]);

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default SuccessPanel;