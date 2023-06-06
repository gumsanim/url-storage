import React from 'react';
import { ErrorBoundaryProps } from './ErrorBoundary.types';
import Error from '../Error/Error';

class ErrorBoundary extends React.Component<any, ErrorBoundaryProps> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
    this.resolveError = this.resolveError.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  resolveError() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error
          message={'Error'}
          buttonTxt={'URL LIST 페이지로 돌아가기'}
          errorHandler={this.resolveError}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
