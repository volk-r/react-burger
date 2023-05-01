import PropTypes from "prop-types";

export const burgerAttributes = {
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
}