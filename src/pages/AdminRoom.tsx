import { useState, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useAuth } from './../hooks/useAuth';

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from './../components/Button';
import { RoomCode } from './../components/RoomCode';

import '../styles/room.scss'
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const history = useHistory()
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const params = useParams<RoomParams>()
  const roomID = params.id
  const { title, questions } = useRoom(roomID)

  async function handleDeleteQuestion(questionID: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta')) {
      const questionRef = await database.ref(`rooms/${roomID}/questions/${questionID}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {
            questions.map(item => {
              return (
                <Question key={item.id} author={item.author} content={item.content}>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(item.id)}
                  >
                    <img src={deleteImg} alt="Remover Pergunta" />
                  </button>
                </Question>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}