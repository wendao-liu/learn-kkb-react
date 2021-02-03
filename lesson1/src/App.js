import React, {useState} from "react";
import ContextPage from "./pages/ContextPage";
import AntdFormPage from "./pages/AntdFormPage";
import MyRCFieldForm from "./pages/MyRCFieldForm";
import DialogPage from "./pages/DialogPage";

export default function App(props) {
  const [count,setCount] = useState(0)
  return (
    <div>
      <button onClick={()=>{setCount((c)=>(c+1))}}>2321</button>
      <div>{count}</div>
      <MyRCFieldForm />
    </div>
  );
}
