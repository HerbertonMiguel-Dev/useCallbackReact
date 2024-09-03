import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Importa React e os hooks useState, useEffect, useMemo, e useCallback

function App() {
  // Hook useState para gerenciar o estado das tarefas e do input
  const [tarefas, setTarefas] = useState([]); // Inicializa 'tarefas' como um array vazio
  const [input, setInput] = useState(''); // Inicializa 'input' como uma string vazia

  // useEffect executado uma vez quando o componente é montado
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas'); // Tenta obter a lista de tarefas do localStorage

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage)); // Se houver tarefas salvas, atualiza o estado 'tarefas' com os dados do localStorage
    }
  }, []); // Array de dependências vazio indica que o efeito deve rodar apenas na montagem do componente

  // useEffect executado sempre que o estado 'tarefas' é atualizado
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva a lista de tarefas no localStorage sempre que a lista mudar
  }, [tarefas]); // Executa o efeito sempre que 'tarefas' mudar

  // Função de callback memorizada para adicionar uma nova tarefa à lista
  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input]); // Atualiza o estado 'tarefas' adicionando a nova tarefa (valor do input)
    setInput(''); // Limpa o campo de input após adicionar a tarefa
  }, [input, tarefas]); // Dependências: 'input' e 'tarefas'. A função só é recriada se uma dessas dependências mudar

  // useMemo para memorizar o total de tarefas e evitar cálculos desnecessários
  const totalTarefas = useMemo(() => tarefas.length, [tarefas]); 
  // Calcula o comprimento da lista de tarefas e o memoriza; só será recalculado se 'tarefas' mudar

  return (
    <div> {/* Container principal */}
      <ul> {/* Lista de tarefas */}
        {tarefas.map(tarefa => ( // Mapeia cada tarefa para um item de lista
          <li key={tarefa}>{tarefa}</li> // Cada tarefa é exibida como um item de lista (li)
        ))}
      </ul>
      
      <br/>    
      {/* Exibe o total de tarefas usando a variável 'totalTarefas' memorizada */}
      <strong>Você tem {totalTarefas} tarefas!</strong>
      <br/>
      
      {/* Campo de input controlado para adicionar novas tarefas */}
      <input 
        type="text" 
        value={input} // O valor do input é controlado pelo estado 'input'
        onChange={e => setInput(e.target.value)} // Atualiza o estado 'input' conforme o usuário digita
      />
      
      {/* Botão para adicionar a nova tarefa */}
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App; // Exporta o componente App como padrão para uso em outros arquivos
