import Col from 'react-bootstrap/Col';

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${process.env.REACT_APP_BASE_URL}${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}
