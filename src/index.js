import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history'
// 1. Initialize
export const app = dva({
  history: createHistory(),
  loading :createLoading()
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/ShowUser').default);
app.model(require('@/models/login').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

