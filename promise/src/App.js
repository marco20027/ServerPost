import logo from './logo.svg';
import React from 'react'
import './App.css'
import { useState } from "react";

/* 2 post primi due 5 commenti non adiacenti 10 user*/
//https://jsonplaceholder.typicode.com/posts/1
async function fetchPost(ID) {
  console.log('sto facendo la chiamata api')
  const post = await fetch(
    'https://jsonplaceholder.typicode.com/posts/'+ID,

    {
      method: 'GET'
    }
  ).then((p) => p.json());
  console.log(post)
  return post
}
async function fetchCommenti(ID) {
  const commenti = await fetch(
    'https://jsonplaceholder.typicode.com/comments/'+ID,

    {
      method: 'GET'
    }
  ).then((c) => c.json());
  //console.log(commenti)
  return commenti
}
async function fetchUtenti(ID) {
  const utenti = await fetch(
    'https://jsonplaceholder.typicode.com/users/' + ID,
    {
      method: 'GET'
    }
  ).then((u) => u.json());
  console.log(utenti)
  return utenti;
}
async function fetchAlbum(ID){
  const album = await fetch(
    'https://jsonplaceholder.typicode.com/albums/' + ID,
  
  {
    method: 'GET'
  }
  ).then((al) => al.json());
  console.log(album)
  return album
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


const random = (lun, maxN) => {
  let arr = [];
  while(arr.length < lun){
      var r = Math.floor(Math.random() * maxN) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr); 
  return arr
}




function App() {
  const [post, setPost] = useState([])
  const [commenti, setCommenti] = useState([])
  const [utenti, setUtenti] = useState([])
  const [album, setAlbum] = useState([])
  const buttonClickPost = async () => {
    let posts = []
    for(let i = 1 ; i <= 2; i++){
      let post = await fetchPost(i).then((result) => result)
      posts.push(post)
    }
    setPost(posts)
  }

  const buttonClickComments = async () => {
    let comments = []
    let ids = random(3, 500)
    for(let i = 0 ; i < ids.length; i++){
      let comment = await fetchCommenti(ids[i]).then((result) => result)
      comments.push(comment)
    }
    setCommenti(comments)
  }
  const buttonClickUtenti = async () =>{
    let users = []
    for (let i = 1; i <= 10; i++){
      let user = await fetchUtenti(i).then((result) => result)
      users.push(user)
    }
    setUtenti(users)
  }

  const buttonClickAlbum = async () => {
    let a = []
    let cd = random(5,100)
    for (let i = 0; i< cd.length; i++){
      let disco = await fetchAlbum(cd[i]).then((result)=> result)
      a.push(disco)
    }
    setAlbum(a)
  }

  
  // const keys = getKeys(post)
  // console.log(keys)
  // const buttonClickCommenti = () => {
  //   fetchCommenti().then((result) => {
  //     setCommenti([result])
  //     console.log(result)
  //   })
  // }
  // const keys1 = getKeys1(commenti)
  // console.log(keys1)
  // const buttonClickUtenti = () => {
  //   fetchUtenti().then((result) => {
  //     setUtenti([result])
  //     console.log(result)
  //   })
  // }
  // const keys2 = getKeys2(utenti)
  // console.log(keys2)

  return (
    <div className="App">
      <header className="App-header">
       <h1>API CALL</h1>
        <button type='button' onClick={() => buttonClickPost()}>API post</button>
        <button type='button' onClick={() => buttonClickComments()}>API commenti</button>
        <button type='button' onClick={() => buttonClickUtenti()}>API utenti</button>
        <button type='button' onClick={() => buttonClickAlbum()}>API album</button>
        
        

        {/* <button type='button' onClick={buttonClickUtenti}>API utenti</button> */}
        <br>
        </br>
        <div>
          {/* <table>
            <thead>
              <tr>
                {keys.map((key) => {
                  <th key={key}>{key}</th>
                })}
              </tr>
            </thead>
            <tbody>
              <pre>{JSON.stringify({post})}</pre>
               */}
              <ul>
              {post.map((item) => {
                return (
                  <li key={item.id}>
                    {item.body}
                  </li>
                )
              })}
              </ul>

              <ul>
              {commenti.map((item) => {
                return (
                  <li key={item.id}>
                    {item.body}
                  </li>
                )
              })}
              </ul>
              {/*<li>
                {post.map((item)=>{
                  return(
                    <li key={item.id}>
                      {item.body}
                      </li>
                  )
                })}
              </li>*/}
              {/* {post.filter((item,el)=>{
                const value = item[el]
                if( value > item.id[el] === '1' && value < item.id[el] === '4' )
                return <tr key={item.body}>  
                </tr>
              })} */}
              <ul>
                {utenti.map((item)=>{
                  return(
                  <li key={item.id}>
                    {item.name}
                  </li>
                  )
                })}
              </ul>
              <ul>
                {album.map((item)=>{
                  return(
                    <li key={item.id}>
                      {item.title}
                    </li>
                  )
                })}
                </ul>
              
{/* 
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
              {keys1.map((key) => {
                  <th key={key}>{key}</th>
                })}
              </tr>
            </thead>
            <tbody>
            <pre>{JSON.stringify({commenti})}</pre>
              
              {commenti.map((item) => {
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
              {commenti.filter((item,el)=>{
                const value = item[el]
                if( value > item.id[el] === '1' && value < item.id[el] === '4' )
                return <tr key={item.body}>  
                </tr>
              })}
  

            </tbody>
          </table>
          <div>
            <table>
              <thead>
                <tr>
                {keys2.map((key) => {
                  <th key={key}>{key}</th>
                })}
                </tr>
              </thead>
              <tbody>
                <pre>{JSON.stringify({utenti})}</pre>
              
              {utenti.map((item) => {
                return (
                  <tr key={item.id}>
                    {item.title}
                    {keys.map((key, index) => {
                      const value = item[key];
                      if ( typeof value === 'string')
                        return <td key={index}>{value}</td>
                      else return ""
                    })}
                  </tr>

                )
              })}
              {utenti.filter((item,el)=>{
                const value = item[el]
                if( value > item.id[el] === '1' && value < item.id[el] === '4' )
                return <tr key={item.body}>  
                </tr>
              })}

              </tbody>
            </table> */}
          </div>

      </header>
    </div>
  );
}


export default App;
