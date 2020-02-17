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
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStyles } from './styles';
import Request from '../core/request';
import { useDataAPI } from '../core/hooks';
import { LoginSchema } from '../core/validators/auth';
import { StateFullAlert } from '../components';
import { URLS } from '../conf';

export default () => {
  const classes = useAuthStyles();
  const [{ isLoading, isError, data }, request] = useDataAPI(Request.login);
  const { handleSubmit, register, errors } = useForm({
    validationSchema: LoginSchema,
  });

  const onSubmit = values => request(values);

  if (!isError && data && data.success) {
    return <Redirect to={URLS.MAIN} />;
  }

  return (
    <>
      {isLoading && <LinearProgress />}
      {isError && <StateFullAlert text={data} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              helperText={errors.email ? errors.email.message : ''}
              inputRef={register}
              error={!!errors.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              Sign In
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
                <Link component={RouterLink} to={URLS.SIGN_UP} variant="body2">
                  Do not have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
