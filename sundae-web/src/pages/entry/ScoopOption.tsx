import { ReactElement, ChangeEvent } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { OptionItemProps } from './types';

export default function ScoopOption(props: OptionItemProps): ReactElement {
  const { name, imagePath, updateItemCount } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, Number(event.target.value));
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={serverUrl + imagePath} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
