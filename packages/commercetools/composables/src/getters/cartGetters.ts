import { CartGetters, AgnosticCoupon, AgnosticPrice, AgnosticTotals } from '@vue-storefront/core';
import { Cart, LineItem } from './../types/GraphQL';
import { getProductAttributes } from './productGetters';
import { createPrice, createFormatPrice } from './_utils';
import { getCouponFromCart } from '../helpers/internals';

export const getCartItems = (cart: Cart): LineItem[] => {
  if (!cart) {
    return [];
  }

  return cart.lineItems;
};

export const getCartItemName = (product: LineItem): string => product.name;

export const getCartItemImage = (product: LineItem): string => product.variant.images[0].url;

export const getCartItemPrice = (product: LineItem): AgnosticPrice => createPrice(product);

export const getCartItemQty = (product: LineItem): number => product.quantity;

export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) =>
  getProductAttributes(product.variant, filterByAttributeName);

export const getCartItemSku = (product: LineItem): string => product.variant.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0
    };
  }

  const subtotalPrice = cart.totalPrice.centAmount;
  const shipping = cart.shippingInfo ? cart.shippingInfo.price.centAmount : 0;

  return {
    total: (shipping + subtotalPrice) / 100,
    subtotal: subtotalPrice / 100
  };
};

export const getCartShippingPrice = (cart: Cart): number => cart && cart.shippingInfo ? cart.shippingInfo.price.centAmount / 100 : 0;

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

export const getFormattedPrice = (price: number) => createFormatPrice(price);
export const getCoupon = (cart: Cart): AgnosticCoupon => {
  return getCouponFromCart(cart);
};

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getTotalItems: getCartTotalItems,
  getCoupon,
  getFormattedPrice
};

export default cartGetters;
