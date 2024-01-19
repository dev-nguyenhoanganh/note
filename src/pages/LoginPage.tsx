import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useIntl } from 'react-intl';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Typography, Divider, Stack, Button, Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

// hooks
import useResponsive from '@/hook/useResponsive';
// components
import { Iconify } from '@/components/iconify';
import LazyImage from '@/components/lazy-image';
// sections
import { LoginForm } from '../sections/auth/login';
import { Theme } from '@/types';
// Azure storage
import { BlobServiceClient } from '@azure/storage-blob';
// Azure authentication for credential dependency
// import { InteractiveBrowserCredential } from '@azure/identity';
import { PublicClientApplication } from '@azure/msal-browser';
import { TokenCredential, AccessToken } from '@azure/core-auth';

class StaticTokenCredential implements TokenCredential {
  // AccessToken is an object with two properties:
  // - A "token" property with a string value.
  // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.
  constructor(private accessToken: AccessToken) {}
  async getToken(): Promise<AccessToken> {
    return this.accessToken;
  }
}

const accountName = process.env.ENV_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.ENV_ACCOUNT_KEY;
const folderName = 'public';
const clientId = '7f8c6672-d7a3-4c87-8013-5dca80c972fd';
const directoryId = '49b0a076-058d-4e19-be6f-3420d8d07c82';

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${directoryId}`,
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

const customApiToken = await msalInstance.acquireTokenSilent({
  scopes: ['User.Read'],
});

('https://hoanganh.blob.core.windows.net/public/public/BB_Checklist_Review.pdf');

if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');

// const baseUrl = `https://${accountName}.blob.core.windows.net/${folderName}`;
// const storageClient = new BlobServiceClient(baseUrl, new InteractiveBrowserCredential({ clientId }));
// const containerName = process.env.ENV_CONTAINER_NAME;
// const containerClient = storageClient.getContainerClient(containerName || '');

const getAllFiles = async () => {
  try {
    // msalInstance.get
    const credential = new StaticTokenCredential({
      token: customApiToken.accessToken,
      expiresOnTimestamp: customApiToken.expiresOn?.getTime() || 0,
    });

    const client = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credential);

    // client.listContainers();

    let i = 1;
    for await (const container of client.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }

    // do something with containerClient...
    // let i = 1;
    // for await (const blob of client.listBlobsFlat()) {
    //   console.log(`Blob ${i++}: ${blob.name}`);
    // }

    // let i = 1;
    // for await (const blob of containerClient.listBlobsFlat()) {
    //   console.log(`Blob ${i++}: ${blob.name}`);
    // }
  } catch (error) {
    console.error('Error listing files:', error);
  }
};

async function downloadFileInBrowser(fileName: string) {
  console.log(fileName);

  //
}

// ----------------------------------------------------------------------

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
    zIndex: '-1',
    opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const StyledForm = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: 0,
  padding: theme.spacing(6, 3),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
}));

const StyledSection = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),

  [theme.breakpoints.down('lg')]: {
    margin: 'auto',
    borderRadius: '16px',
    backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
    backdropFilter: 'blur(135px)',
  },
}));

const StyledContent = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

const helmetData = new HelmetData({});

export default function HomePage() {
  const upLg = useResponsive('up', 'lg');
  const theme: Theme = useTheme();
  // const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  const showMaintainMessage = () => {
    openSnackbar(formatMessage({ id: 'notice.maintain' }), {
      variant: 'warning',
    });
  };

  return (
    <React.Fragment>
      <Helmet helmetData={helmetData}>
        <title>Login</title>
      </Helmet>

      <StyledContainer>
        <StyledSection theme={theme}>
          <Typography data-testid="sign-in-label" variant="h3" sx={{ mt: 2, mb: 4 }} gutterBottom>
            Sign in
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              data-testid="google-button"
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" width={22} />
            </Button>

            <Button
              data-testid="facebook-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} />
            </Button>

            <Button
              data-testid="twitter-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography data-testid="or-label" variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2}>
            <Button
              data-testid="twitter-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={getAllFiles}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} />
              List all file
            </Button>

            <Button
              data-testid="twitter-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={() => downloadFileInBrowser('BB_Checklist_Review.pdf')}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} />
              Download file checklist
            </Button>
          </Stack>

          <LoginForm />
        </StyledSection>

        {upLg && (
          <StyledForm>
            <StyledContent>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <LazyImage src="/assets/illustrations/illustration_dashboard.png" alt="login" />
            </StyledContent>
          </StyledForm>
        )}
      </StyledContainer>
    </React.Fragment>
  );
}
