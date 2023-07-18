import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import OrderEntry from '../OrderEntry';

test('update scoops subtotal when scoops change', async () => {
  const user = userEvent.setup();

  render(<Options optionType={'scoops'} />);

  const scoopsSubtotal = screen.getByText('Scoops total', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();

  render(<Options optionType={'toppings'} />);

  const toppingsSubtotal = screen.getByText('Toppings total', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total/i });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
