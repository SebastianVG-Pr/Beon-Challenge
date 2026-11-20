import { Booking, CreateBookingResponse } from '../support/types';

export class BookingApi {
  private readonly baseUrl: string = `${Cypress.expose('apiUrl')}/booking`;
  private readonly jsonHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  create(booking: Booking): Cypress.Chainable<Cypress.Response<CreateBookingResponse>> {
    return cy.request<CreateBookingResponse>({
      method: 'POST',
      url: this.baseUrl,
      headers: this.jsonHeaders,
      body: booking,
    });
  }

  // pass false when you expect a 404
  getById(id: number, failOnStatusCode = true): Cypress.Chainable<Cypress.Response<Booking>> {
    return cy.request<Booking>({
      method: 'GET',
      url: `${this.baseUrl}/${id}`,
      headers: { Accept: 'application/json' },
      failOnStatusCode,
    });
  }

  update(id: number, booking: Booking, token: string): Cypress.Chainable<Cypress.Response<Booking>> {
    return cy.request<Booking>({
      method: 'PUT',
      url: `${this.baseUrl}/${id}`,
      headers: { ...this.jsonHeaders, Cookie: `token=${token}` },
      body: booking,
    });
  }

  delete(id: number, token: string): Cypress.Chainable<Cypress.Response<string>> {
    return cy.request<string>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
      headers: { Cookie: `token=${token}` },
    });
  }
}

export const bookingApi = new BookingApi();
