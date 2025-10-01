import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Detail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState(null)
  useEffect(() => {fetch(`http://localhost:5000/post/${id}`)
      .then(response => response.json())
      .then(data => {
        setDetail(data.detail)
      })
    },[])

    if(!detail)
      return (
        <div>
          게시글 없음
        </div>
      )
  return (
    <>
      <h2> {id}상세 페이지</h2>
        <p> 제목 : {detail.title} </p>
        <p> 작성자 : {detail.author.nickname} </p>
        <div>
          {detail.content}
        </div>
        <button onClick={() => {
          navigate(`/edit/${detail.id}`, {state : {post : detail}})
        }}>수정</button>

        <button onClick={() => {
          fetch(`http://localhost:5000/post/${id}`, {
            method:'DELETE',
            credentials:'include'
          }).then(response => response.json())
            .then(data => {
              alert(data.message)
              if(data.ok)
                navigate('/')
            }).catch(e => {
              console.log(e)
            })
        }}>삭제</button>
    </>
  )
}
export default Detail