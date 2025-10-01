import Index from '.'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Write from './write'
import Detail from './detail'
import Edit from './edit'

import { useEffect, useState } from 'react'
function App() {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    fetch('http://localhost:5000/auth/me', {
      credentials:'include'
    }).then(response => response.json())
      .then(data => {
        setUserInfo(data.user)
      })
  }, [])
  return (
    <>
      {
        userInfo && <h4>{userInfo.nickname} 님 환영</h4>
      }
      <header>
        <Link to='/'>==인덱스==</Link>
        <Link to='/signup'>==회원가입==</Link>
        {
          userInfo 
          ? <Link  onClick={() => {
            fetch('http://localhost:5000/auth/logout', {
              method:'POST',
              credentials: 'include'
            }).then(response => response.json())
              .then(data => {
                alert(data.message)
                setUserInfo(null)
              }).catch(e => {
                console.log(e)
              })
          }}>로그아웃 </Link> 

          : <Link to='/login'>==로그인== </Link>
        }
        
        <Link to='/write'>=== 글 작성===</Link>
      </header>

      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setUserInfo={setUserInfo}/>} />
        <Route path='/write' element={<Write /> } />
        <Route path='/post/:id' element={<Detail />}/>
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>

    </>
  )
}

export default App
