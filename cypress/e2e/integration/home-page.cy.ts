import { API_URL } from "../../../src/utils/burger-api";
import {
    TEST_EMAIL,
    TEST_PASSWORD
} from "../../../src/utils/constants";

describe("Home page works correctly", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.intercept("POST", `${API_URL}/orders`).as("postOrder");
        cy.intercept("POST", `${API_URL}/auth/login`).as("login");
        cy.intercept("GET", `${API_URL}/ingredients`).as("getIngredients");

        cy.get("[class^=burger-constructor_container]").as("constructor");
        cy.get('[class *= "burger-ingredients-list_box"]').as('ingredientList');
    });

    it("should login in test account", () => {
        cy.visit("/login");
        cy.get("[name^=email]").type( TEST_EMAIL );
        cy.get("[name^=password]").type( TEST_PASSWORD );
        cy.get("button").contains("Войти").click();
        cy.wait("@login");
    });

    it("should open and close ingredients popup", () => {
        cy.get("#ingredients-container");
        cy.get("[class^=burger-ingredients-list_box]").first().click();
        cy.get("[data-cy='close']").click();
    });

    it("should make order", () => {
        cy.get("#section_bun")
            .next('div')
            .find('[class^="burger-ingredients-list_box"]')
            .first()
            .as("bun");

        cy.get("#section_main")
            .next('div')
            .find('[class^="burger-ingredients-list_box"]')
            .first()
            .as("main");

        cy.get("#section_sauce")
            .next('div')
            .find('[class^="burger-ingredients-list_box"]')
            .last()
            .as("sauce");

        cy.get("button").contains("Оформить заказ").as("submit");

        cy.get("@bun").trigger("dragstart");
        cy.get("@constructor").trigger("drop");
        cy.get("@main").trigger("dragstart");
        cy.get("@constructor").trigger("drop");
        cy.get("@sauce").trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@submit").click()

        cy.get("[name^=email]").type( TEST_EMAIL );
        cy.get("[name^=password]").type( TEST_PASSWORD );
        cy.get("button").contains("Войти").click();
        cy.wait("@login");

        cy.get("@submit")
            .click()
            .wait("@postOrder");

        cy.get("[class^='order-details_orderNumber']");
        cy.get("[data-cy='close']").click();
    });

    it('can remove ingredients', () => {
        cy.get('@ingredientList').eq(0).as('first');
        cy.get('@ingredientList').eq(2).as('third');

        cy.get('[class *= "burger-constructor_listContainer"] [class*="burger-constructor_listItem"]').as('constructorList');

        cy.get('@constructorList')
            .should(
            'have.length',
            1
        );

        cy.get('@first').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@constructorList').should(
            'have.length',
            1
        );

        cy.get('@third').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@third').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@constructorList').should(
            'have.length',
            2
        );

        cy.get('@constructorList')
            .eq(1)
            .find('.constructor-element__action')
            .click();

        cy.get('@constructorList').should(
            'have.length',
            1
        );
    });
});

export {};