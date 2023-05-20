export const burgerIngredientsSelector = (store) => store.ingredients.burgerIngredients
export const ingredientsSelector = (store) => store.ingredients.burgerIngredients.ingredients
export const isLoadingIngredientsSelector = (store) => store.ingredients.ingredientsRequest
export const hasErrorIngredientsSelector = (store) => store.ingredients.ingredientsFailed

export const burgerConstructorIngredientsSelector = (store) => store.constructorIngredients
export const selectedItemSelector = (store) => store.currentIngredient.selectedItem
export const orderNumberSelector = (store) => store.order.orderNumber
