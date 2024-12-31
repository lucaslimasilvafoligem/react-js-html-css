import React, { useState } from 'react'
import Item from '../components/Item'


export default function News() {
    const [hideItem, setHideItem] = useState(false);
    var topicos = [{titulo: "Mega Corporações", subtitulo: "A nata podre de Night City", olink: "https://www.youtube.com/watch?v=LembwKDo1Dk&pp=ygUOY3liZXJwdW5rIDIwNzc%3D"},{titulo: "Mercenários", subtitulo: "Se alguém puder pagar, tudo pode ser feito", olink: "https://youtu.be/6a8f1TbYb2w"},{titulo: "Corrupção dos Cops", subtitulo: "Até onde vai?", olink: "https://youtu.be/reABCMNGM3w"}]
    
  return (
    <div>
      <Item titulo="Tudo por alguns edinhos" subtitulo="Welcome samurai" olink= "https://youtu.be/izWxL2mhPvQ"/>

      {hideItem == false
        ? topicos.map((topico,key) => (
            <Item key={key} titulo={topico.titulo} subtitulo={topico.subtitulo} olink={topico.olink} />
            ))
          : null}
      <button onClick={() => setHideItem(!hideItem)}>   
      {hideItem==false ? "xumiu" : "apareceu"}
      </button>
    </div>
  )
}
