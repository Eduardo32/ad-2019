import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import ParticipanteItem from './components/ParticipanteItem';

function App() {
  const [participantes, setParticipantes] = useState([]);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sorteiRealizado, setSorteiRealizado] = useState(false);

  useEffect(() => {
    async function loadParticipantes() {
      const res = await api.get('/participantes')

      setParticipantes(res.data);
    }

    loadParticipantes();
  }, []);

  async function handleAddParticipante(e) {
    e.preventDefault();

    let res

    if(!id) {
      res = await api.post('/participantes', {
        nome,
        email,
      });

      setParticipantes([...participantes, res.data]);
    } else {
      const index = participantes.findIndex(participante => participante._id === id)

      let participantesNovo = participantes

      participantesNovo.splice(index, 1);
      res = await api.put(`/participantes/${id}`, {
        nome,
        email,
      });

      setParticipantes([...participantesNovo, { _id : id, nome, email }]);
    }

    setId('');
    setNome('');
    setEmail('');
  }

  function handleEditParticipante(data) {
    setId(data._id);
    setNome(data.nome);
    setEmail(data.email);
  }

  async function handleDeleteParticipante(id) {
    const index = participantes.findIndex(participante => participante._id === id)
    
    let participantesNovo = participantes.slice();
    
    participantesNovo.splice(index, 1);
    
    await api.delete(`/participantes/${id}`);

    setParticipantes(participantesNovo);
  }

  async function handleNew() {
    const options = {
      title: 'Title',
      message: 'Message',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => <div>Custom UI</div>,
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    };
    
    confirmAlert(options);

    await api.delete('/participantes');

    setSorteiRealizado(false);
    setParticipantes([]);
  }

  async function handleSorteio() {
    if(participantes.length > 1) {
      let participantesNovo;
      let amigos;
      let max;
      let num;
      let controle;
      let repete;
      
      do {
        participantesNovo = [...participantes];
        amigos = [...participantes];
        max = participantes.length;
        controle = 0;
        repete = false;

        for(var i = 0; i < participantesNovo.length; i++){
          do {
            controle++
            num = Math.floor(Math.random() * (max - 0) + 0);
          } while(amigos[num]._id === participantesNovo[i]._id && controle < 100)

          if(amigos[num]._id !== participantesNovo[i]._id) {
            participantesNovo[i].amigo = amigos[num].nome;
            controle = 0;
            amigos.splice(num, 1);
            max--;

            api.put(`/participantes/${participantesNovo[i]._id}`, {
              "nome": participantesNovo[i].nome,
              "email" : participantesNovo[i].email,
              "amigo": participantesNovo[i].amigo,
            });
          } else {
            repete = true;
            break;
          }
        }
      } while (repete)

      setParticipantes(participantesNovo);
      setSorteiRealizado(true);
    } else {
      alert('Voce precisa cadastar pelo menos dois participantes.');
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Participante</strong>
            <form onSubmit={handleAddParticipante}>
              <div className="input-block">
                <label htmlFor="participante_nome">Nome</label>
                <input 
                  name="participante_nome" 
                  id="participante_nome" 
                  required 
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="participante_email">Email</label>
                <input 
                  type="email" 
                  name="participante_email" 
                  id="participante_email" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" disabled={sorteiRealizado} >Salvar</button>
          </form>
          <strong>Opções</strong>
          <div className="options">
            <button className="novo" onClick={handleNew} >Iniciar Novo Amigo Invisivel</button>
            <button className="sortear" onClick={handleSorteio} disabled={sorteiRealizado} >Sortear Amigos</button>
          </div>
      </aside>
      <main>
        <ul>
          {participantes.map(participante => (
            <ParticipanteItem 
              key={participante._id} 
              participante={participante}
              sorteiRealizado={sorteiRealizado}
              onEdit={handleEditParticipante} 
              onDelete={handleDeleteParticipante}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
