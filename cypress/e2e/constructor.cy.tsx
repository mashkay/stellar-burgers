/// <reference types="cypress" />

const dataCy = 'data-cy';
const noBunsText = 'Выберите булки';
const noFillingText = 'Выберите начинку';
const addText = 'Добавить';
const removeSelector = '.constructor-element__action';
const moveUPSelector = '.move_button:first-of-type';
const moveDownSelector = '.move_button:last-of-type';
const orderButtonText = 'Оформить заказ';

const bun1 = {
  _id: '643d69a5c3f7b9001cfa093c',
  text: 'Краторная булка N-200i'
};

const bun2 = {
  _id: '643d69a5c3f7b9001cfa093d',
  text: 'Флюоресцентная булка R2-D3'
};

const filling1 = {
  _id: '643d69a5c3f7b9001cfa0941',
  text: 'Биокотлета из марсианской Магнолии'
};

const filling2 = {
  _id: '643d69a5c3f7b9001cfa093e',
  text: 'Филе Люминесцентного тетраодонтимформа'
};

const filling3 = {
  _id: '643d69a5c3f7b9001cfa0945',
  text: 'Соус с шипами Антарианского плоскоходца'
};

describe('constructor page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');

    // нашли нужные контейнеры
    cy.get('[data-cy="constructor"]').as('constructor').should('be.visible');

    cy.get('[data-cy="top-no-buns"]').as('topNoBuns').should('be.visible');

    cy.get('[data-cy="bottom-no-buns"]')
      .as('bottomNoBuns')
      .should('be.visible');

    cy.get(`[data-cy=${bun1._id}]`).as('bun1');
    cy.get(`[data-cy=${bun2._id}]`).as('bun2');
    cy.get(`[data-cy="${filling1._id}"]`).as('ingredient1');
    cy.get(`[data-cy="${filling2._id}"]`).as('ingredient2');
    cy.get(`[data-cy="${filling3._id}"]`).as('ingredient3');
    cy.get('[data-cy="filling-no-items"]')
      .as('fillingNoItems')
      .should('be.visible');
    cy.get('[data-cy="fillingsList"]').as('fillingsList').should('be.visible');
  });

  describe('add/change bun', () => {
    it('add one bun,  than add another bun', () => {
      // проверили что контейнеры с текстом "Выберите булки" появились

      cy.get('@constructor').contains(noBunsText);
      cy.get('@topNoBuns').contains(noBunsText);
      cy.get('@bottomNoBuns').contains(noBunsText);

      // нашли булку 1, нашли у нее кнопку добавить, кликнули на нее
      cy.get('@bun1').contains(addText).click();

      // проверили что сверху булка появилась
      cy.get(`[data-cy=top-bun-${bun1._id}]`)
        .as('topBun1')
        .should('be.visible')
        .contains(bun1.text);
      // проверили что снизу булка появилась
      cy.get(`[data-cy=bottom-bun-${bun1._id}]`)
        .as('bottomBun1')
        .should('be.visible')
        .contains(bun1.text);

      // проверили что контейнеры с текстом "Выберите булки" исчезли
      cy.get('@constructor').should('not.contain', noBunsText);
      cy.get('@constructor').contains(bun1.text);
      cy.get('@topNoBuns').should('not.exist');
      cy.get('@bottomNoBuns').should('not.exist');

      // нашли булку 2, нашли у нее кнопку добавить, кликнули на нее
      cy.get('@bun2').contains(addText).click();

      // проверили что в конструкторе булка изменилась и что нет булки 1
      cy.get('@constructor')
        .contains(bun2.text)
        .should('not.contain', bun1.text);
      cy.get('@topBun1').should('not.exist');
      cy.get('@bottomBun1').should('not.exist');
      cy.get(`[data-cy="top-bun-${bun2._id}"]`).should('be.visible');
      cy.get(`[data-cy="bottom-bun-${bun2._id}"]`).should('be.visible');

      //   проверили что НЕ появились контейнеры с текстом "Выберите булки"
      cy.get('@constructor').should('not.contain', noBunsText);
      cy.get('@topNoBuns').should('not.exist');
      cy.get('@bottomNoBuns').should('not.exist');
    });
  });
  describe('add/remove/move ingredients', () => {
    it('add/remove 1 ingredient', () => {
      // нашли контейнер где должен быть ингредиент и проверили что там нет ингредиента
      cy.get('@fillingsList').contains(noFillingText).should('be.visible');
      cy.get('@fillingNoItems').contains(noFillingText).should('be.visible');

      // добавили ингредиент 1
      cy.get('@ingredient1').contains(addText).click();

      // проверили что ингредиент появился в конструкторе
      cy.get('@fillingsList')
        .contains(filling1.text)
        //  что нет текста "Выберите начинку"
        .should('not.contain', noFillingText);

      cy.get('@fillingsList').children().should('have.length', 1);

      cy.get('@fillingNoItems').should('not.exist');

      // нашли контейнер где должен быть ингредиент и проверили что там есть ингредиент
      cy.get(`[data-cy="filling-${filling1._id}"]`).as('filling');

      cy.get('@filling').should('be.visible').contains(filling1.text);
      // проверили что он один
      cy.get('@filling').should('have.length', 1);

      // удалили ингредиент 1
      cy.get('@filling').find(removeSelector).click();

      // проверили что ингредиент исчез и что появился контейнер с текстом "Выберите начинку"
      cy.get('@filling').should('not.exist');
      cy.get('@fillingNoItems')
        .should('be.visible')
        .should('not.contain', filling1.text)
        .contains(noFillingText);
      cy.get('@fillingsList')
        .should('not.contain', filling1.text)
        .contains(noFillingText);
    });

    it('add 2 same ingredients, remove 1', () => {
      // добавили ингредиент 1 дважды
      cy.get('@ingredient1').contains(addText).click().click();

      // проверили что в бургере теперь 2 ингредиента
      cy.get(`[data-cy="filling-${filling1._id}"]`)
        .as('filling')
        .should('be.visible')
        .should('have.length', 2)
        .contains(filling1.text);

      // нашли ингредиент 1, нашли у него кнопку удалить, кликнули на нее
      cy.get('@filling').first().find(removeSelector).click();

      // проверили что остался только 1 ингредиент
      cy.get('@filling').contains(filling1.text).should('have.length', 1);
    });

    it('add 2 different ingredients, remove 1', () => {
      // добавили ингредиент 1
      cy.get('@ingredient1').contains(addText).click();

      // добавили ингредиент 2
      cy.get('@ingredient2').contains(addText).click();

      // проверили что в бургере теперь 2 ингредиента
      cy.get('@fillingsList').children().should('have.length', 2);
      cy.get('@fillingsList').contains(filling2.text);
      cy.get('@fillingsList').contains(filling1.text);

      // нашли ингредиент 2, нашли у него кнопку удалить, кликнули на нее
      cy.get(`[data-cy="filling-${filling1._id}"]`)
        .as('filling1')
        .find(removeSelector)
        .click();

      // проверили что ингредиент 1 исчез
      cy.get('filling1').should('not.exist');
      // проверили что в бургере остался ингредиент 2
      cy.get(`[data-cy="filling-${filling2._id}"]`);

      cy.get('@fillingsList').children().should('have.length', 1);
      cy.get('@fillingsList').contains(filling1.text).should('not.exist');
      cy.get('@fillingsList').contains(filling2.text).should('be.visible');
    });

    it('add 3 ingredients, move 1 up , move down', () => {
      // добавили ингредиент 1
      cy.get('@ingredient1').contains(addText).click();

      // добавили ингредиент 2
      cy.get('@ingredient2').contains(addText).click();

      // добавили ингредиент 3
      cy.get('@ingredient3').contains(addText).click();

      // проверили что в бургере теперь 3 ингредиента
      cy.get('@fillingsList').children().should('have.length', 3);
      cy.get('@fillingsList')
        .children()
        .then((children) => {
          cy.wrap(children[0]).contains(filling1.text);
          cy.wrap(children[1]).contains(filling2.text);
          cy.wrap(children[2]).contains(filling3.text);
        });

      // нашли ингредиент 2, нашли у него кнопку вверх, кликнули на неей
      cy.get(`[data-cy="filling-${filling2._id}"]`)
        .as('filling2')
        .find(moveUPSelector)
        .click();

      // проверили что ингредиент 2 поднялся на место 1
      cy.get('@fillingsList')
        .children()
        .then((children) => {
          cy.wrap(children[0]).contains(filling2.text);
          cy.wrap(children[1]).contains(filling1.text);
          cy.wrap(children[2]).contains(filling3.text);
        });

      cy.get('@filling2').find(moveDownSelector).click();

      // проверили что ингредиент 2 опустился на место 2
      cy.get('@fillingsList')
        .children()
        .then((children) => {
          cy.wrap(children[0]).contains(filling1.text);
          cy.wrap(children[1]).contains(filling2.text);
          cy.wrap(children[2]).contains(filling3.text);
        });
    });
  });

  describe('ingredient details & modal', () => {
    it('check modal by opening ingredient details', () => {
      // нажали на ингредиент 1
      cy.get('@ingredient1').click('topLeft');
      // проверили что модалка появилась
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      // проверили что в модалке текст ингредиента
      cy.get('@modal').contains(filling1.text);

      // нашли кнопку закрыть модалку, кликнули на нее
      cy.get('[data-cy="modal-close"]').click();
      // проверили что модалка закрылась
      cy.get('@modal').should('not.exist');

      // нажали на ингредиент 2
      cy.get('@ingredient2').click('topLeft');
      // проверили что модалка появилась
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      // проверили что в модалке текст ингредиента
      cy.get('@modal').contains(filling2.text);

      // нажали на оверлей
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      // проверили что модалка закрылась
      cy.get('@modal').should('not.exist');

      // нажали на ингредиент 3
      cy.get('@ingredient3').click('topLeft');
      // проверили что модалка появилась
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      // проверили что в модалке текст ингредиента
      cy.get('@modal').contains(filling3.text);

      // нажали ESC на клавиатуре
      cy.get('body').type('{esc}');
      // проверили что модалка закрылась
      cy.get('@modal').should('not.exist');
    });
  });

  describe('make order', () => {
    beforeEach(() => {
      // найдем кнопку оформить заказ
      cy.get('@constructor').contains(orderButtonText).as('orderButton');
    });
    it('try order without bun and without login ', () => {
      cy.get('@orderButton').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it("try correct order  without login, should redirect to '/login'", () => {
      cy.get('@bun1').contains(addText).click();
      cy.get('@ingredient1').contains(addText).click();
      cy.get('@orderButton').click();

      cy.url().should('include', '/login');
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    describe('try correct order with login', () => {
      beforeEach(() => {
        cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');

        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', '/api/auth/login', {
          fixture: 'user.json'
        });
        cy.intercept('POST', '/api/orders', {
          fixture: 'newOrderResponse.json'
        });

        cy.visit('/');
      });

      it('should open modal with order number', () => {
        cy.get('@bun1').contains(addText).click();
        cy.get('@ingredient1').contains(addText).click();
        cy.get('@orderButton').click();

        // проверим что не редиректнуло на логин
        cy.url().should('not.include', '/login');

        // проверим что модалка появилась, что в ней верный текст с номером заказа
        cy.get('[data-cy="modal"]').as('modal').should('be.visible');
        cy.get('@modal').contains('58183');

        // проверим что кнопка закрыть модалку работает
        cy.get('[data-cy="modal-close"]').click();

        cy.get('@modal').should('not.exist');

        // проверим что заказ исчез из конструктора
        cy.get('@constructor').contains(bun1.text).should('not.exist');
        cy.get('@constructor').contains(filling1.text).should('not.exist');

        // проверим что контейнеры с текстом "Выберите булки" появились
        cy.get('@constructor').contains(noBunsText);
      });
    });
  });
});
