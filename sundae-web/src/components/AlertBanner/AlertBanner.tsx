import { ReactElement } from 'react';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';
import './AlertBanner.scss';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';

interface AlertBannerProps {
  message: string;
  variant?: Variant;
}

export default function AlertBanner(props: AlertBannerProps): ReactElement {
  const { message, variant = 'danger' } = props;
  return (
    <Alert variant={variant} className={classNames('alert-banner', variant)}>
      Error: {message}
    </Alert>
  );
}
