import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/styles/app.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Home from './features/home/containers/Home'
import Favourites from './features/favourites/containers/Favourites'

const store = configureStore();

function App() {
  return (
    <div className="">
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={Home} key={'home'}/>
                    <Route exact path={'/favourites'} component={Favourites} key={`favourites`}/>
                </Switch>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
