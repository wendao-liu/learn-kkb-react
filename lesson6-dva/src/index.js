// import dva from "dva";
import app from "./app";
import "./index.css";
import createLoading from './dva-loading';

// // // 1. Initialize
// // const app = dva();

// const createHistory = require("history").createBrowserHistory;

// const app = dva({
//   history: createHistory()
// });

// // 2. Plugins
// app.use(createLoading());

// // 3. Model
// app.model(require("./models/example").default);
// app.model(require("./models/user").default);

// // 4. Router
// app.router(require("./router").default);

// // 5. Start
// app.start("#root");


app.use(createLoading());

app.model(require("./models/example").default)
app.model(require("./models/user").default)

app.router(require('./router').default)

app.start('#root')
