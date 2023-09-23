import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register';

describe('Register Component', () => {
  test('handles customer registration submission', async () => {
    render(<Register />);

    fireEvent.change(screen.getAllByLabelText(/Name/i)[0], { target: { value: 'J' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'J' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'J@J.J' }, });
    fireEvent.change(screen.getByLabelText(/HP No./i), { target: { value: 'J' } });
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'J' }, });
    fireEvent.change(screen.getByLabelText(/Re-enter Password/i), { target: { value: 'J' }, });

    // Mock the fetch call
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ customerID: '123' }),
    });
    global.fetch = fetchMock;


    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    // Wait for the fetch call to resolve
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: '0',
        name: 'J',
        username: 'J',
        email: 'J@J.J',
        phone: 'J',
        password: 'J',
        reEnterPassword: 'J'
      }),
    }));

    // Additional expectation for response status and customer ID
    const response = await fetchMock.mock.results[0].value;
    const responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData.customerID).toBe('123');
  });

  test('renders Customer sign up form by default', () => {
    render(<Register />);
    expect(screen.getByText(/Sign up as a Customer/i)).toBeInTheDocument();
  });

  test('renders Vendor sign up form after tab switch', () => {
    render(<Register />);
    fireEvent.click(screen.getByText(/Vendor/i));
    expect(screen.getByText(/Sign up as a Vendor/i)).toBeInTheDocument();
  });

  test('displays error messages for empty form fields for customer tab', () => {
    render(<Register />);
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))
    expect(screen.getAllByText(/Required/i)).toHaveLength(6);
  });

  test('displays Invalid email address', () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });

  test('displays Passwords do not match', () => {
    render(<Register />);
    fireEvent.change(screen.getAllByLabelText(/Password/i)[0], {
      target: { value: 'qwerty' },
    });
    fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
      target: { value: 'qwerty1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))
    expect(screen.getAllByText(/Passwords do not match./i)[0]).toBeInTheDocument();
  });
});
