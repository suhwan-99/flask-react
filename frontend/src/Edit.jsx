import { useLocation, useNavigate} from "react-router-dom";
import { useState} from "react";
const Edit = () => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [post, setPost] = useState(state.post)

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  }
    
  return (
    <>
      <h2> "{post.id}" 글 수정 페이지</h2>
        제목 : <input type="text" name="title" value={post.title} onChange={onChangeHandler}/>  <br />
        내용 : <textarea name="content" onChange={onChangeHandler} defaultValue={post.content}></textarea> <br />
        <button onClick={async () => {
          const response = await fetch(`http://localhost:5000/post/${post.id}`, {
            method: 'PUT',
            headers:{
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(post),
            credentials: 'include'
          })
          const data = await response.json()
          alert(data.message)
          if (data.ok)
            navigate('/detail')
        }}>저장</button>
    </>

  )
}

export default Edit;