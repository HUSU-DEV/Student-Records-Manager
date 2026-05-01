import './App.css';
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLISHABLE_KEY);

const date = new Date().toString();
const anything = 13178142;
let user = null; 

// async function testSignIn() {
//   const result = await supabase.auth.signInWithPassword({
//     email: "Alice.Lopez@email.com",
//     password: "experiment",
//   });
//   document.getElementsByTagName("body")[0].appendChild(
//     document.createRange().createContextualFragment(
//       "<pre>" + JSON.stringify(result, null, 4) + "</pre>"
//     )
//   );
// }
// testSignIn();

function App() {
  const [state, setState] = useState(null);
  if (user == null) {
    return (
      <div className="App">
        <LogInForm startOver={()=>setState()} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Hello {process.env.REACT_APP_STUDENT_ID}</h1>
        <p>{date} {anything}</p>
        <POJOList />
        <hr />
      </div>
    );
  }
}

function LogInForm(properties) {
  const [state, setState] = useState({username: "", password: ""});
  return (
    <div className="LogInForm">
      <table><tbody><tr><td>Username:</td><td>
      <input 
        type="text" 
        value={state.username}
        onInput={(event)=>setState({username:event.target.value, password:state.password})}
      /></td></tr><tr><td>Password:</td><td>
      <input 
        type="password" 
        value={state.password}
        onInput={(event)=>setState({username:state.username, password:event.target.value})}
      /></td></tr><tr><td colSpan="2">
      <button
        type="button"
        onClick={async () => { 
          const result = await supabase.auth.signInWithPassword({
            email: state.username,
            password: state.password,
          });
          if (result.error) {
            alert(result.error.message);
          } else {
            user = result.data.user;
            alert("Login successful");
            setState({username: "", password: ""});
            properties.startOver();
          }
        }}
      >Log in</button></td></tr></tbody></table>
    </div>
  );
}

function MyPOJO(properties) {
  const [state, setState] = useState({changed: false, pojo: properties.pojo});
  const pojo = state.pojo;
  const changed = state.changed;
  return (
    <div className="MyPOJO" style={{border: changed ? "solid red" : "solid white"}}>
      <input type="text" disabled defaultValue={pojo.id_number} />
      <input type="text" defaultValue={pojo.first_name}
        onInput={(event)=>setState({changed:true, pojo:{id_number:pojo.id_number, first_name:event.target.value, last_name:pojo.last_name}})} />
      <input type="text" defaultValue={pojo.last_name}
        onInput={(event)=>setState({changed:true, pojo:{id_number:pojo.id_number, first_name:pojo.first_name, last_name:event.target.value}})} />
      <button type="button" disabled={!changed}
        onClick={async () => { 
          if (pojo.id_number === "NEW") {
            pojo.id_number = undefined;
            const { error } = await supabase.from('mypojo').insert(pojo);
            console.log(JSON.stringify(error));
            properties.refreshPOJOList();  
          } else {
            const { error } = await supabase.from('mypojo').update(pojo).eq("id_number",pojo.id_number);
            console.log(JSON.stringify(error));
            setState({changed:false, pojo:pojo});
          }
        }}>Save</button>
      <button type="button"
        onClick={async () => { 
          const { error } = await supabase.from('mypojo').delete().eq("id_number",pojo.id_number);
          console.log(JSON.stringify(error));
          properties.refreshPOJOList();
        }}>Delete</button>
    </div>
  );
}

function POJOList() {
  const [pojoArray, setPojoArray] = useState(null);
  if (pojoArray == null) {
    supabase.from('mypojo').select().order('id_number').then(
      ({ data, error }) => {
        data.push({id_number:"NEW"});
        setPojoArray(data);
      }
    );
    return <div>Loading...</div>;
  } else {
    const listItems = pojoArray.map(item =>
      <div key={item.id_number}>
        <MyPOJO pojo={item} refreshPOJOList={setPojoArray} />
      </div>
    );
    return (
      <div className="POJOList">
        <h2>User: {user.email}</h2>
        {listItems}
      </div>
    );
  }
}

export default App;