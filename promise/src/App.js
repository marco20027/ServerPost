import logo from './logo.svg';
import './App.css'
import { useState } from "react";

/* 2 post primi due 5 commenti non adiacenti 10 user*/
//https://jsonplaceholder.typicode.com/posts/1
async function fetchPost() {
  console.log('sto facendo la chiamata api')
  const post = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1',

    {
      method: 'GET'
    }
  ).then((p) => p.json());
  console.log(post)
  return post

}
async function fetchCommenti() {
  const commenti = await fetch(
    'https://jsonplaceholder.typicode.com/comments/1',

    {
      method: 'GET'
    }
  ).then((c) => c.json());
  console.log(commenti)
  return commenti
}
async function fetchUtenti() {
  const utenti = await fetch(
    'https://jsonplaceholder.typicode.com/users',
    {
      method: 'GET'
    }
  ).then((u) => u.json());
  return utenti;
}
function getKeys(post) {
  if (post.length > 0) {
    return Object.keys(post[0]);
  } else {
    return [];
  }
}
function getKeys1(commenti) {
  if (commenti.length > 0) {
    return Object.keys(commenti[0]);
  } else {
    return [];
  }
}
function getKeys2(utenti) {
  if (utenti.length > 0) {
    return Object.keys(utenti[0]);
  } else {
    return [];
  }
}




function App() {
  const [post, setPost] = useState([])
  const [commenti, setCommenti] = useState([])
  const [utenti, setUtenti] = useState([])
  const buttonClickPost = () => {
    fetchPost().then((result) => {
      setPost([result])
      console.log(result)
    })
  }
  const keys = getKeys(post)
  console.log(keys)
  const buttonClickCommenti = () => {
    fetchCommenti().then((result) => {
      setCommenti(result)
      console.log(result)
    })
  }
  const keys1 = getKeys1(commenti)
  console.log(keys1)
  const buttonClickUtenti = () => {
    fetchUtenti().then((result) => {
      setUtenti(result)
      console.log(result)
    })
  }
  const keys2 = getKeys2(utenti)
  console.log(keys2)

  return (
    <div className="App">
      <header className="App-header">
        <button type='button' onClick={buttonClickPost}>API post</button>
        <button type='button' onClick={buttonClickCommenti}>API commenti</button>
        <button type='button' onClick={buttonClickUtenti}>API utenti</button>
        <br>
        </br>
        <div>
          <table>
            <thead>
              <tr>
                {keys.map((key) => {
                  <th key={key}>{key}</th>
                })}
              </tr>
            </thead>
            <tbody>
              <pre>{JSON.stringify({post})}</pre>
              
              {post.map((item) => {
                return (
                  <tr key={item.id}>
                    {item.title}
                    {keys.map((key, index) => {
                      const value = item[key];
                      if (value === 'string')
                        return <td key={index}>{value}</td>
                      else return ""
                    })}
                  </tr>

                )
              })}
              {post.filter((item,el)=>{
                const value = item[el]
                if( value > item.id[el] === '1' && value < item.id[el] === '4' )
                return <tr key={item.body}>  
                </tr>
              })}

            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
              
              </tr>
            </thead>
            <tbody>
  

            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}


export default App;
