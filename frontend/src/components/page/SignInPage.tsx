import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import useAuthStore from "@/store/AuthStore";
import ErrorAlert from "../presenter/ErrorPanel";

const schema = z.object({
    login: z.string(),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

type SignInSchemaType = z.infer<typeof schema>;

const SignInPage = () => {
    console.log('Render SignInPage')
    const navigate = useNavigate()
    const authInfo = useAuthStore((state) => state.authInfo)
    const signIn = useAuthStore((state) => state.signIn)
    const {
        control,
        handleSubmit,
        formState: { errors } } = useForm<SignInSchemaType>({
        resolver: zodResolver(schema)
    });

    const onSubmit : SubmitHandler<SignInSchemaType> = async (data) => {
        await signIn(data.login, data.password, navigate)
    };

    // if (authInfo.status === 'error') {
    //     return (
    //         <ErrorAlert message={authInfo.errorMessage}></ErrorAlert>
    //     )
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        name="login"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="login"
                                label="login"
                                autoFocus
                                error={!!errors.login}
                                helperText={errors.login ? errors.login.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignInPage;