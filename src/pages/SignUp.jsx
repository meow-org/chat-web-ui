import React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  LinearProgress,
  Grid,
  Typography,
  Container,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStyles } from './styles';
import Request from '../core/request';
import { useDataAPI } from '../core/hooks';
import { RegistrationSchema } from '../core/validators/auth';
import { StateFullAlert } from '../components';
import { URLS } from '../conf';

export default () => {
  const classes = useAuthStyles();
  const [{ isLoading, isError, data }, request] = useDataAPI(Request.registration);
  const { handleSubmit, register, errors } = useForm({
    validationSchema: RegistrationSchema,
  });

  const onSubmit = values => request(values);

  return (
    <>
      {isLoading && <LinearProgress />}
      {isError && <StateFullAlert text={data} />}
      {!isError && data && data.success && <StateFullAlert text={
        <>We have sent a confirmation letter to your inbox. Please follow the link.</>
      } severity="info"/>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              helperText={errors.username ? errors.username.message : ''}
              inputRef={register}
              error={!!errors.username}
              label="Your name"
              name="username"
              autoComplete="name"
              autoFocus
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              helperText={errors.email ? errors.email.message : ''}
              inputRef={register}
              error={!!errors.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              inputRef={register}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to={URLS.CHANGE_PASSWORD}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={URLS.SIGN_IN} variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
