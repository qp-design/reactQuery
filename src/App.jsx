import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Prepare from "./pages/Prepare";
import ScanCheck from "./pages/Scanning";
import Plan from "./pages/Plan"
import Test from "./pages/test"
import Context, {useWsContext} from "./common/encapsulation/context";
import {useEffect} from "react";
import Completed from "./pages/Completed";

function Wrap() {

  const history = useHistory();
  const {routerPath} = useWsContext();

  useEffect(() => {

    history.push(`/${routerPath}`)
  }, [routerPath,history])

  return (
    <div className="App">
      <Switch>
        <Route path="/Scanning">
          <ScanCheck/>
        </Route>
        <Route path="/Prepare">
          <Prepare/>
        </Route>
        <Route path="/Plan">
          <Plan/>
        </Route>
        <Route path="/Completed">
          <Completed/>
        </Route>
        <Route path="/Test">
          <Test/>
        </Route>
      </Switch>
    </div>
  );
}

const App = () => (
  <Context>
    <Wrap/>
  </Context>
)


export default App;
