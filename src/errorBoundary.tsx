import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '12%',
            backgroundColor: '#122faa',
            color: '#fff',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontSize: '18px',
            textAlign: 'left',
          }}
        >
          <p>
            A problem has been detected and Browser has been shut down to prevent damage to your
            computer.
          </p>
          <p>The problem seems to be caused by the following file: index.html</p>
          <p>SYSTEM_THREAD_EXCEPTION_NOT_HANDLED</p>
          <p>
            If this is the first time you&apos;ve seen this stop error screen, restart your
            computer. If this screen appears again, follow these steps
          </p>
          <p>
            Check to make sure any new hardware or software is properly installed. If this is a new
            installation, ask your hardware or software manufacturer for any Browser updates you
            might need.
          </p>
          <p>
            If problems continue, disable or remove any newly installed hardware or software.
            Disable BIOS memory options such as caching or shadowing. If you need to use safe mode
            to remove or disable components, restart your computer, press F5 to select Advanced
            Startup Options, and then select Safe Mode.
          </p>
          <p>Technical Information:</p>
          <p>
            *** STOP: 0x1000007e (0xffffffffc0000005, 0xfffff80002e55151, 0xfffff880009a99d8,
            0xfffff880009a9230)
          </p>
          <p>
            *** index.html - Address 0xfffff80002e55151 base at 0xfffff80002e0d000 DateStamp
            0x4ce7951a
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
