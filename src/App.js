import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Main from './Main'
import GoodsJsx from './goods'
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="table">商品列表</Link>
        </li>
      </ul>
      <Route path={'/'} exact render={() => <Main />}/>
      <Route path={'/table'} exact render={() => <GoodsJsx />}/>
    </Router>
    <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
