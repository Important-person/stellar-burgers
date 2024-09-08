describe('add ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('/');
  });

  it('add bun', () => {
    cy.get('[data-cy=contructor_bun_1]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=contructor_bun_2]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=contructor_bun_1]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy=contructor_bun_2]').contains('Краторная булка N-200i').should('exist');
  });

  it('add stuffing', () => {
    cy.get('[data-cy=contructor_stuffing]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('[data-cy=stuffing]').contains('Добавить').click();
    cy.get('[data-cy=souse]').contains('Добавить').click();
    cy.get('[data-cy=contructor_stuffing]').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('[data-cy=contructor_stuffing]').contains('Соус Spicy-X').should('exist');
  });
});

describe('test modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:4000/');
  });

  it('open modal test', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('close modal cross test', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close_button_test]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('close modal overlay test', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close_overlay_test]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});


describe('test order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});

    localStorage.setItem('refreshToken', 'refreshToken');
    cy.setCookie('accessToken', 'accessToken');
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('checking the order', () => {
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=stuffing]').contains('Добавить').click();
    cy.get('[data-cy=souse]').contains('Добавить').click();
    cy.get('[data-cy=order_test] button').contains('Оформить заказ').click();

    cy.get('[data-cy=order_number_modal]').contains('52045').click();

    cy.get('[data-cy=close_button_test]').click();
    cy.get('[data-cy=order_number_modal]').should('not.exist');

    cy.get('[data-cy=contructor_bun_1]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=contructor_bun_2]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=contructor_stuffing]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
  });
})


