import React, { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import { Button, Typography, Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';

interface State {
  hasError: boolean;
  error: ErrorState;
}

interface ErrorState {
  title: string;
  content: string;
}

const initialState = {
  hasError: false,
  error: {
    title: '',
    content: '',
  },
};

const StyledContainer = styled(Container)(({ theme }) => ({
  '&.MuiContainer-root': {
    width: '100%',
    height: '100vh',
    maxWidth: 'unset',
    margin: 0,
    backgroundColor: '#F5F5F5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '.MuiAlert-root.MuiAlert-standardError': {
      width: '750px',
      marginTop: theme.spacing(4),
    },

    '.page-heading': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',

      '.MuiSvgIcon-root': {
        width: '200px',
        height: 'auto',
        fill: '#CCCCCC',
      },
      '.MuiTypography-h2': {
        marginTop: theme.spacing(2),
        color: '#A6A6A6',
        fontSize: '4.75rem',
      },
      '.MuiTypography-body1': {
        marginTop: theme.spacing(3),
        color: '#A6A6A6',
        fontSize: '1.75rem',
      },
      '.MuiButton-root.MuiButton-contained': {
        minWidth: '140px',
        marginTop: theme.spacing(3),
      },
    },
  },
}));

type Props = PropsWithChildren<unknown>;

function Error(state: State): JSX.Element {
  const { formatMessage } = useIntl();
  const { error } = state;

  const handleBackPage = async () => {
    document.location.href = document.location.origin;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <StyledContainer>
        <Box className="page-heading">
          <Typography component="h2" variant="h2">
            {formatMessage({ id: 'errorBoundary.heading' })}
          </Typography>
          <Typography component="p" variant="body1">
            {formatMessage({ id: 'errorBoundary.subHeading' })}
          </Typography>
          <Button variant="contained" size="large" onClick={handleBackPage} data-testid="back-button">
            {formatMessage({ id: 'button.backPage' })}
          </Button>
          {error.title}
        </Box>
      </StyledContainer>
    </React.Fragment>
  );
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  // エラー発生時のライフサイクル。描画に関わる処理を実装する。
  static getDerivedStateFromError(_error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error: {
        title: _error.name,
        content: _error.stack ?? '',
      },
    };
  }

  // TODO: componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return <Error {...this.state} />;
  }
}
