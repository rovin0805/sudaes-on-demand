import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from '../../../test-utils/testing-library-utils';
import OrderConfirmation from '../OrderConfirmation';

test('error response from server for submitting order', async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    rest.post(`${process.env.REACT_APP_BASE_URL}/order`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later.'
  );
});
