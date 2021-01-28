import React, {useState} from "react";
import ReactReduxHookPage from "./pages/ReactReduxHookPage";
import ReactReduxPage from "./pages/ReactReduxPage";


export default function App(props) {
  const [state, setState] = useState(1);
  return (
    <div>
      {/* <button onClick={() => setState(state + 1)}>add : {state}</button> */}
      {/* <HooksPage /> */}
      <ReactReduxPage />
      <ReactReduxHookPage />
    </div>
  );
}
