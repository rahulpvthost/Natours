/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const res = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Redirect to Stripe's Checkout page
    window.location.href = res.data.session.url;
  } catch (err) {
    console.log(err);
    showAlert('error', err.response?.data?.message || 'Something went wrong');
  }
};