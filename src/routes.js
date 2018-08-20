import { TabNavigator, StackNavigator } from 'react-navigation';
import { colors } from 'styles';

import Home from 'pages/home';
import Product from 'pages/product';
import Cart from 'pages/cart';

const navigationOptions = ({ navigation }) => ({
  headerStyle: {
    height: 54,
    backgroundColor: colors.white,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  headerTintColor: colors.regular,
  headerBackTitle: null,
});

const createNavigator = () => TabNavigator(
  {
    Main: StackNavigator(
      {
        Home: { screen: Home },
        Product: { screen: Product },
      },
      {
        initialRouteName: 'Home',
        navigationOptions,
      },
    ),
    Cart: StackNavigator(
      {
        Cart: { screen: Cart },
      },
      {
        initialRouteName: 'Cart',
        navigationOptions,
      },
    ),
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.gray,
      style: {
        height: 54,
        backgroundColor: colors.white,
      },
      indicatorStyle: {
        height: 0,
      },
    },
  },
);

export default createNavigator;
