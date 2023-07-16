import { Col } from 'react-bootstrap';

export default function ScoopOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${process.env.REACT_APP_BASE_URL}${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}
