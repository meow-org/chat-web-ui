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
import { ChangePassSchema } from '../core/validators/auth';
import { StateFullAlert } from '../components';
import { URLS } from '../conf';

export default () => {
  const classes = useAuthStyles();
  const [{ isLoading, isError, data }, request] = useDataAPI(
    Request.changePass,
  );
  const { handleSubmit, register, errors } = useForm({
    validationSchema: ChangePassSchema,
  });

  const onSubmit = values => request(values);

  return (
    <>
      {isLoading && <LinearProgress />}
      {isError && <StateFullAlert text={data} />}
      {!isError && data && data.success && (
        <StateFullAlert
          text={
            <>
              We have sent a confirmation letter to your inbox. Please follow
              the link.
            </>
          }
          severity="info"
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change password
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={URLS.SIGN_IN} variant="body2">
                  Sign in
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
