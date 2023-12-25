import React, { useLayoutEffect, FormEvent, useState, useEffect } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

// Form
import { object, ValidationError, string, array } from 'yup';
import { FormProvider, useForm, Resolver, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, Stack, Link, Paper, alpha } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useAppSelector } from '@/store/hook';
// components
import { Iconify } from '@/components/iconify';
import InputControl from '@/components/form-control/InputControl';
import InputVerifyCode from '@/components/form-control/InputVerifyCode';

// sections
import { URL_MAPPING } from '@/routes/urlMapping';

// Message
import message from '@/resources/lang/en.json';
import { Loading } from '@/components/loading';
import { RootState } from '@/store';

// ----------------------------------------------------------------------

const StyledForm = styled('form')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
    zIndex: '-1',
    backgroundBlendMode: 'difference',
    opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
  },
  display: 'flex',
  height: '100%',
}));

const StyledContainer = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: 0,
  padding: '48px 24px',
  maxWidth: 480,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === 'dark' ? 0.1 : 0.8,
  ),
  backdropFilter: 'blur(135px)',
}));

const StyledImage = styled('img')(() => ({
  width: '96px',
  height: '96px',
}));

const StyledContent = styled('div')({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});
const INPUT_SIZE = 6;

interface FormData extends FieldValues {
  email: string;
  code: string[];
  password: string;
  confirmPassword: string;
}

export default function NewPassword() {
  const { formatMessage } = useIntl();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);

  const validationSchema = object<FormData>().shape({
    code: string()
      .required(message['validate.required'])
      .length(INPUT_SIZE, message['validate.required']),
    password: string().required(message['validate.required']),
    confirmPassword: array()
      .test({
        name: 'Required field',
        message: message['validate.required'],
        test: ([password] = []) => Boolean(password),
      })
      .test({
        name: 'Confirm password mismatch',
        message: message['validate.password.mismatch'],
        test: ([password, confirmPassword] = []) =>
          password === confirmPassword,
      }),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      email: '',
      code: Array(INPUT_SIZE).fill(''),
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  });

  const { getValues, clearErrors, setError, setValue } = formConfig;

  useLayoutEffect(() => {
    if (token) {
      navigate(URL_MAPPING.ROOT, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (state === null) {
      navigate(URL_MAPPING.RESET_PASSWORD, { replace: true });
    }

    setValue('email', state.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (loading || linkLoading) {
        return;
      }

      setLoading(true);
      clearErrors();

      const { code, password, confirmPassword } = getValues();

      await validationSchema.validate(
        {
          code: code.join(''),
          password,
          confirmPassword: [password, confirmPassword],
        },
        { abortEarly: false },
      );

      // TODO: API confirm password
      openSnackbar(formatMessage({ id: 'success.resetPassword.update' }), {
        variant: 'success',
      });

      navigate(URL_MAPPING.LOGIN);
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.map((field) => {
          const fieldName = field.path ?? '';
          // Highlight Error and display error message
          setError(fieldName, field);
        });
        return;
      }

      openSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (loading || linkLoading) {
        return;
      }
      setLinkLoading(true);
      clearErrors();

      const { email } = getValues();
      if (!email) {
        return;
      }

      // TODO: API resend verify code
      openSnackbar(formatMessage({ id: 'success.resetPassword.sendEmail' }), {
        variant: 'success',
      });
    } catch (e) {
      openSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLinkLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet helmetData={helmetData}>
        <title>New Password</title>
      </Helmet>

      {linkLoading && <Loading fullWidth={true} />}

      <StyledForm onSubmit={handleSubmit}>
        <FormProvider {...formConfig}>
          <StyledContainer>
            <StyledContent>
              <Stack mb={3} justifyContent="center" alignItems="center">
                <StyledImage
                  src="/assets/illustrations/illustration_email.svg"
                  alt="login"
                />
              </Stack>

              <Stack mb={5} justifyContent="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                  Request sent successfully!
                </Typography>
                <Typography variant="body1" textAlign="center">
                  We&apos;ve sent a 6-digit confirmation email to your email.
                  Please enter the code in below box to verify your email.
                </Typography>
              </Stack>

              <Stack gap={3}>
                <InputControl label="Email address" name="email" disabled />
                <InputVerifyCode name="code" size={INPUT_SIZE} />
                <InputControl
                  label="Password"
                  name="password"
                  type="password"
                />
                <InputControl
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Update Password
                </LoadingButton>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="6px"
                >
                  Don’t have a code?
                  <Link
                    underline="hover"
                    variant="body1"
                    textAlign="center"
                    onClick={handleResendCode}
                  >
                    Resend code
                  </Link>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="4px"
                >
                  <Iconify icon="grommet-icons:form-previous" color="inherit" />
                  <Link
                    underline="hover"
                    component={ReactLink}
                    variant="body1"
                    textAlign="center"
                    to={URL_MAPPING.LOGIN}
                    paddingRight="28px"
                    color="inherit"
                  >
                    Return to sign in
                  </Link>
                </Box>
              </Stack>
            </StyledContent>
          </StyledContainer>
        </FormProvider>
      </StyledForm>
    </React.Fragment>
  );
}
