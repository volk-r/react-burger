export const ingredientsSelector = (store) => store.ingredients.burgerIngredients.ingredients
export const isLoadingIngredientsSelector = (store) => store.ingredients.ingredientsRequest
export const hasErrorIngredientsSelector = (store) => store.ingredients.ingredientsFailed

export const burgerConstructorIngredientsSelector = (store) => store.constructorIngredients
export const orderSelector = (store) => store.order
export const userInfoSelector = (store) => store.authData.user
export const authDataErrorSelector = (store) => store.authData.message
export const authDataRequestSelector = (store) => store.authData.request
export const resetPasswordEmailSelector = (store) => store.authData.resetPasswordEmail
