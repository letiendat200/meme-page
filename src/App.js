import React, { useState, useEffect } from 'react';
import './App.css';

function App() {   
  const [gallery, spawnGallery] = useState([]);
  const [error, setError] = useState(false); 
    function loadGallery(){
      fetch("https://api.imgflip.com/get_memes").then(function(result) {
        result.json().then(function(final)        
          {
            const gallery = [];
            for(let i = 0; i < final.data.memes.length; i++){
                gallery.push(final.data.memes[i]);
            }
            spawnGallery(gallery);
        },
        (error) => {            
            setError(true);
            console.log(error);
        }        
      )
      })
    }

    useEffect(() => {loadGallery();},[]);   

    if (error) {
        return <h1>Error: Something's wrong has happened</h1>;
    } 
    else {
      return (
        <div>           
            <button className='Button-reload' onClick={() => loadGallery()}>Reload</button>           
            <ul>                
                {
                    gallery.map((imgSrc) => (
                        <img className='Img' src={imgSrc.url}></img>
                    ))
                }                
            </ul>
        </div>
    );
  }
}

export default App;