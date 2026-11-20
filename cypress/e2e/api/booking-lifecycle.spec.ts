import { authApi } from '../../api/AuthApi';
import { bookingApi } from '../../api/BookingApi';
import { Booking } from '../../support/types';

describe('Restful-Booker - API tests', () => {
  // shared between the tests below, they run in order
  let token: string;
  let bookingId: number;
  let booking: Booking;

  before(() => {
    cy.fixture<Booking>('booking').then((data) => {
      booking = data;
    });
  });

  it('Authentication - generates an auth token', () => {
    cy.fixture('apiUser').then(({ username, password }) => {
      authApi.createToken(username, password).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.be.a('string').and.not.be.empty;

        token = response.body.token;
      });
    });
  });

  it('Create Booking - POST returns 200 and a bookingid', () => {
    bookingApi.create(booking).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking).to.deep.equal(booking);

      bookingId = response.body.bookingid;
      // not adding a get check due to using it on the next test
    });
  });

  it('Read Booking - GET matches the created data', () => {
    bookingApi.getById(bookingId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(booking);
    });
  });

  it('Update Booking - PUT changes the checkout date', () => {
    const newCheckout = '2026-12-20';
    const updatedBooking: Booking = {
      ...booking,
      bookingdates: { ...booking.bookingdates, checkout: newCheckout },
    };

    bookingApi.update(bookingId, updatedBooking, token).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingdates.checkout).to.eq(newCheckout);
      expect(response.body).to.deep.equal(updatedBooking);
    });

    // check it was actually saved
    bookingApi.getById(bookingId).its('body.bookingdates.checkout').should('eq', newCheckout);
  });

  it('Delete Booking - DELETE returns 201, then GET returns 404', () => {
    bookingApi.delete(bookingId, token).its('status').should('eq', 201);

    bookingApi.getById(bookingId, false).its('status').should('eq', 404);
  });
});
