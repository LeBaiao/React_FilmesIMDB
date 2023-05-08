import React, {useEffect, useState} from 'react';
import './styles.css';

function App() {
  const [filme, setFilme] = useState([]); //filme é uma variável que guarda o estado em si e setFilme é uma função que muda o estado
  const [id, setId] = useState();         //criado para o filtro da lista de filmes, filtro por id
  const [nome, setNome] = useState(''); 


  const url = 'http://localhost:8080/treinamento-jpa-teste/webapi/filmes';

  const Filmes = () =>{       //função que retorna o fetch da api
    fetch(url)
    .then(response => response.json())
    .then((filme) =>                                 //função anonima que recebe filme como parâmetro
    setFilme(filme.sort((a, b) => b.id - a.id)))    //e retorna uma função de callback definindo o state inicial de filme (id ordenado)
    .catch(function (error) {
    console.log(error);
  });
}

const postFilmes = () => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(filme),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
};

const putFilmes = () => {
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(filme),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
};

const deleteFilme = (id) => {
  fetch (url + '/'+ id, {
    method: 'DELETE',
  })
  return(
  Filmes()
  )
};


  useEffect (Filmes, []);     //parametros: uma função e um array de variáveis para controlar o hook

//function verificaBusca(){
 

  function inputNome(event){
    setNome(event.target.value);
  };

  function inputId(event) {
    setId(event.target.value);
  };

  function apagaLista(){
    setFilme([]);
  };

  function geraLista(){
    Filmes()
  };

  function inverteLista(){ 
    setFilme([...filme].reverse());     //cria um novo array (com as informações da tabela filme) e dá reverse nesse novo array
  };

const filtroFilme = filme.filter((filmeFiltrado) => (!nome || filmeFiltrado?.nome?.includes(nome)) && (!id || id.includes(filmeFiltrado.id)));   


  return (
    <div className="App">
        <h1 className= "title">🎬 Filmes 🍿 </h1>
        
        <div id='inputBusca '>
        <input 
        id= 'filtroNome'
        type='text'
        value={nome} 
        onChange={inputNome}
        placeholder='Busque por nome...' />
        
        <input
        id= 'filtroId'
        type='text'
        value={id}
        onChange={inputId}
        placeholder= 'Busque pelo Id do filme...' />
        </div>

        <h4 className='nomeInput'>Lista de Filmes</h4>
        <table>
        <tbody>
          <tr className='listaFilme'>
            <td>Título</td><td>ID</td>
            </tr>
        {filtroFilme.map((filme) =>(
          <tr className='dadosTabela'>
            <td>{filme.nome}</td>
            <td>{filme.id}</td>
            <button id='deleteButton' onClick={() => deleteFilme(filme.id)}> Excluir Filme</button>
          </tr>
            
        ))}
        </tbody>
        </table>
        
        <button onClick={apagaLista}>Limpar</button>
        <button onClick={geraLista}>Recarregar</button>
        <button onClick={inverteLista}> Inverter lista</button>


        <button onClick={postFilmes}>Inserir filme</button>
    </div>
  );
}

export default App;
