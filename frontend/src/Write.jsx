import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Write = () => {
  const [post, setPost] = useState({
    title : '',
    content : '',
  })

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })

  }
  return (
    <>
    <div>

      제목 : <input type="text" name="title" onChange={onChangeHandler}/> <br />
      내용 : <textarea name="content" onChange={onChangeHandler}/> <br />
      <button onClick={async () => {
        const response = await fetch('http://localhost:5000/post', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(post),
          credentials:'include'
        })
        const data = await response.json()
        alert(data.message)
        if (data.ok)
          navigate('/')
      }}>글 등록</button>
    </div>
    </>
  )
}

export default Write;