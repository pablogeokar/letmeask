import { FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from './../hooks/useAuth';

import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import facebookIconImg from '../assets/images/Facebook_white.svg'
import { Button } from './../components/Button';

import '../styles/auth.scss'
import { useState } from 'react';
import { database } from '../services/firebase';


export function Home() {
  const history = useHistory();
  const { user, signWithGoogle, signinWithFacebook } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleCreateRoomWithFacebook() {
    if (!user) {
      await signinWithFacebook()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed')
      return
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button className="create-room google" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <button className="create-room facebook" onClick={handleCreateRoomWithFacebook}>
            <img src={facebookIconImg} style={{ height: '28px', width: '28px' }} alt="Logo do facebook" />
            Crie sua sala com o Facebook
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="" onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}