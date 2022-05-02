import { ChangeEvent, ReactElement } from 'react';
import { Form, Col } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { OptionItemProps } from './types';

export default function ToppingOption(props: OptionItemProps): ReactElement {
  const { name, imagePath, updateItemCount } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={serverUrl + imagePath} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
