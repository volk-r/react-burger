import { API_URL } from "../../../src/utils/burger-api";
import {
    TEST_EMAIL,
    TEST_PASSWORD
} from "../../../src/utils/constants";

describe("Order functional works correctly", () => {
    beforeEach(() => {
        cy.intercept("POST", `${API_URL}/orders`).as("postOrder");
        cy.intercept("POST", `${API_URL}/auth/login`).as("login");
        cy.intercept("GET", `${API_URL}/ingredients`).as("getIngredients");
    });

    it("should login in test account", () => {
        cy.visit("/login");
        cy.get("[name^=email]").type( TEST_EMAIL );
        cy.get("[name^=password]").type( TEST_PASSWORD );
        cy.get("button").contains("Войти").click();
        cy.wait("@login");
    });

    it("should open and close ingredients popup", () => {
        cy.visit("/");
        cy.get("#ingredients-container");
        cy.get("[class^=burger-ingredients-list_box]").first().click();
        cy.get("[data-cy='close']").click();
    });

    it("should make order", () => {
        cy.visit("/");

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

        cy.get("[class^=burger-constructor_container]").as("constructor");
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
});

export {};