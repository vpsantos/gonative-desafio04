import Immutable from 'seamless-immutable';
import { Decimal } from 'decimal.js-light';

/**
 * Types
 */
export const Types = {
  ADD_PRODUCT: 'cart/ADD_PRODUCT',
  REMOVE_PRODUCT: 'cart/REMOVE_PRODUCT',
  UPDATE_PRODUCT: 'cart/UPDATE_PRODUCT',
};

/**
 * Reducer
 */
const intialState = Immutable({
  data: [],
  total: 0,
});

export default function cart(state = intialState, action) {
  switch (action.type) {
    case Types.ADD_PRODUCT: {
      const index = state.data.findIndex(product => product.id === action.payload.product.id);

      if (index !== -1) {
        const { data } = state;
        const quantity = data[index].quantity + 1;

        data[index].quantity = quantity;
        data[index].subtotal = new Decimal(data[index].price).mul(quantity);

        const total = new Decimal(state.total).add(data[index].price).toFixed(2);

        return {
          data,
          total,
        };
      }

      const newProduct = action.payload.product;
      newProduct.quantity = 1;
      newProduct.subtotal = newProduct.price;

      return {
        data: [...state.data, newProduct],
        total: new Decimal(state.total).add(newProduct.price).toFixed(2),
      };
    }
    case Types.REMOVE_PRODUCT: {
      const amount = new Decimal(action.payload.product.price).mul(action.payload.product.quantity);

      return {
        data: state.data.filter(product => product.id !== action.payload.product.id),
        total: new Decimal(state.total).sub(amount).toFixed(2),
      };
    }
    case Types.UPDATE_PRODUCT: {
      if (!action.payload.quantity || new Decimal(action.payload.quantity).isZero()) {
        return state;
      }

      const index = state.data.findIndex(product => product.id === action.payload.id);

      const { data } = state;
      const currentSubtotal = data[index].subtotal;

      data[index].quantity = action.payload.quantity;
      data[index].subtotal = new Decimal(data[index].price).mul(action.payload.quantity);

      const total = new Decimal(state.total)
        .sub(currentSubtotal)
        .add(data[index].subtotal)
        .toFixed(2);

      return {
        data,
        total,
      };
    }
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addProduct: product => ({
    type: Types.ADD_PRODUCT,
    payload: { product },
  }),

  removeProduct: product => ({
    type: Types.REMOVE_PRODUCT,
    payload: { product },
  }),

  updateProduct: (id, quantity) => ({
    type: Types.UPDATE_PRODUCT,
    payload: { id, quantity },
  }),
};
