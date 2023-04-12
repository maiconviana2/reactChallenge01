import { useState } from "react";
import "./App.css";

function App() {
  //Definindo a lista de itens a serem renderizados ao clicar na tela.
  const [list, setList] = useState([]);
  //Definindo os itens que serão removidos da lista e tela ao clicar em Undo (Desfazer).
  const [undid, setUndid] = useState([]);

  //Função que adiciona os pontos na tela. 
  const handleClick = (e) => {
    //Através do evento de click capturado -> (e) <-  , temos acesso ao clientX e clientY que são as coordenadas de onde o usuário clicou. Após obter esses dados, criamos um objeto com essas informações.
    const newDot = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    //Em setlist colocamos dentro de list o objeto criado acima. Usamos spread operator -> [...prev] <- para clonar list e adicionar novos itens dentro.
    setList((prev) => [...prev, newDot]);
    console.log(newDot);
  };

  //Função que remove o último ponto criado na tela.
  const handleUndo = ()=>{

    //Caso não haja nada dentro de list, encerramos a função por aqui pois não tem nada para ser desfeito.
    if(list.length === 0){
      return;
    }

    //lastItem armazena o último item adicionado em list.
    const lastItem = list[list.length - 1];

    //A função abaixo adiciona dentro de undid o último item de list. Desta forma ao removermos o item da tela, salvamos em undid para que possamos recuperar depois.
    setUndid((prev)=> [...prev, lastItem])

    //A função abaixo clona o conteúdo de list e retorna uma nova lista sem o último item, que foi removido pela função acima, handleUndo.
    setList((prev)=>{
      const newArr = [...prev].slice(0,-1) //.slice(0,-1) basicamente significa que vai cortar o conteúdo da lista removendo o último item.
      return newArr
    })
  }

  //A função abaixo adiciona em list o último item removido pela função handleUndo.
  const handleRedo = ()=>{
    //Se a lista de itens desfeitos estiver vazia, encerra a função aqui.
    if(undid.length === 0 ){
      return;
    }

    //Aqui é armazenado o último item adicionado em undid pela função handleUndo. Precisamos recupera-lo para que possamos colocar na lista novamente caso o clique em Redo (refazer).
    const recoveredDot = undid[undid.length - 1];

    //Função que clona o conteúdo de undid e retorna sem o último item.
    setUndid((prev)=>{
      const newArr =  [...prev].slice(0,-1)
      return newArr
    })

    //Aqui é adicionado dentro de list o último item removido.
    setList((prev)=> [...prev, recoveredDot])
  }


  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>

      <div onClick={handleClick} id="page">
        {list.map((item,index) => (
          <span
            className="dot"
            style={{ left: item.clientX, top: item.clientY }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
