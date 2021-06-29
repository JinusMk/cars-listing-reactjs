import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Home from './features/home/containers/Home'
import Favourites from './features/favourites/containers/Favourites'
import { useEffect } from 'react';
import { fetchCarsList } from './shared_elements/actionCreators'
import { pageLayoutHoc } from './hocs'
import './assets/styles/app.scss';

const store = configureStore();

function App() {
  useEffect(() => {
    store.dispatch(fetchCarsList())
  }, [])
  return (
    <div className="">
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={pageLayoutHoc(Home)} key={'home'}/>
                    <Route exact path={'/favourites'} component={pageLayoutHoc(Favourites)} key={`favourites`}/>
                </Switch>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
