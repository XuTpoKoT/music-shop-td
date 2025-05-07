import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/AuthStore';

const schema = z.object({
  login: z.string().min(1, 'Введите логин'),
  email: z.string().email('Некорректный email'),
  firstname: z.string().min(1, 'Введите имя'),
  surname: z.string().min(1, 'Введите фамилию'),
  patronymic: z.string(),
  password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

type SignUpSchemaType = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    await signUp(data, navigate);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {['login', 'email', 'firstname', 'surname', 'patronymic', 'password'].map((field) => (
            <Controller
              key={field}
              name={field as keyof SignUpSchemaType}
              control={control}
              render={({ field: controllerField }) => (
                <TextField
                  {...controllerField}
                  margin="normal"
                  fullWidth
                  label={
                    field === 'login' ? 'Логин'
                    : field === 'email' ? 'Email'
                    : field === 'firstname' ? 'Имя'
                    : field === 'surname' ? 'Фамилия'
                    : field === 'patronymic' ? 'Отчество'
                    : 'Пароль'
                  }
                  type={field === 'password' ? 'password' : 'text'}
                  error={!!errors[field as keyof typeof errors]}
                  helperText={errors[field as keyof typeof errors]?.message || ''}
                />
              )}
            />
          ))}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
