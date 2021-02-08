import dva from 'dva';
const createHistory = require("history").createBrowserHistory;

const app = dva({
  history: createHistory()
})

export default app