import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/componentes/Home.js';
import NavigationMap from './src/componentes/NavigationMap.js';
import Login from './src/componentes/Login.js';
import RegisterForm from './src/componentes/Register.js';

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  NavigationMap: NavigationMap,
  Login: Login,
  Register: RegisterForm
});

export default createAppContainer(MainNavigator);

