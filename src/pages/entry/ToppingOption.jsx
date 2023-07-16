import { Col, Form } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const handleChange = (e) => {
    updateItemCount({
      itemName: name,
      newItemCount: e.target.checked ? 1 : 0,
      optionType: 'toppings',
    });
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${process.env.REACT_APP_BASE_URL}${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type='checkbox' onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
