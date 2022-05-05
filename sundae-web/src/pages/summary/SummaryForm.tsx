import { FormEvent, useState } from 'react';
import { Form, Button, Popover, OverlayTrigger, PopoverBody } from 'react-bootstrap';
import { SetOrderPhaseAction } from '../../types/businessTypes';

interface SummaryFormProps {
  setOrderPhase: SetOrderPhaseAction;
}

export default function SummaryForm(props: SummaryFormProps) {
  const { setOrderPhase } = props;
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="termsandconditions-popover">
      <PopoverBody>No ice cream will actually be delivered</PopoverBody>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span className="terms-and-conditions"> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setOrderPhase('completed');
  };

  return (
    <Form onSubmit={handleSubmit} className="summary-form">
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={e => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
