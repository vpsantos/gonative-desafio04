import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CurrencyFormat from 'react-currency-format';

import { View, FlatList, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartActions } from 'store/ducks/cart';

import CartItem from './components/CartItem';

import styles from './styles';

const Cart = ({ cart, removeProduct, updateProduct }) => (
  <View style={styles.container}>
    {cart.data.length > 0 ? (
      <Fragment>
        <FlatList
          data={cart.data}
          extraData={cart.total}
          keyExtractor={product => String(product.id)}
          contentContainerStyle={styles.cartList}
          renderItem={({ item }) => (
            <CartItem
              product={item}
              handleUpdate={(quantity) => {
                updateProduct(item.id, Number(quantity));
              }}
              handleDelete={() => {
                removeProduct(item);
              }}
            />
          )}
        />

        <View style={styles.subtotal}>
          <Text style={styles.subtotalText}>Subtotal</Text>
          <CurrencyFormat
            value={cart.total}
            displayType="text"
            thousandSeparator="."
            prefix="R$"
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            renderText={value => <Text style={styles.subtotalPrice}>{value}</Text>}
          />
        </View>
      </Fragment>
    ) : (
      <Text style={styles.message}>Não há produtos no carrinho</Text>
    )}
  </View>
);

const TabBarIcon = ({ tintColor }) => <Icon name="shopping-cart" size={20} color={tintColor} />;

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Cart.navigationOptions = {
  title: 'Carrinho',
  tabBarIcon: TabBarIcon,
};

Cart.propTypes = {
  cart: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    total: PropTypes.number,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
