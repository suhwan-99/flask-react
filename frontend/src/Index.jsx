import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Index = () => {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    fetch('http://localhost:5000/post')
    .then(response => response.json())
    .then(data => {
      setPosts(data.posts)
    })
  },[])  
    if(!posts)
    return <h2> 게시글 없음</h2>
  return (
      <>
        <h2>인덱스 페이지</h2>
        <button onClick={async () => {
          const response = await fetch('http://localhost:5000/check')
          const data = await response.json()
          console.log(data)
        }}>확인 버튼</button>

        <button onClick={async () => {
          const response = await fetch('http://localhost:5000/check2', {
            credentials:'include'
          })
          const data = await response.json()
          console.log(data)
        }}>확인 버튼2</button>

        <h2> 글 목록</h2>
        <table>
          <thead>
            <tr>
            <th>번호</th>
            <th>
              제목
            </th>
            <th>
              작성자
            </th>
            <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            
              {
                posts.map((post, i) => {
                  return (
                    <tr key={i}>
                      <td>{post.id}</td>
                      <td>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </td>
                      <td> {post.author.nickname} </td>
                      <td> {new Date(post.created_at).toLocaleDateString('ko-KR')} </td>
                    </tr>
                  )
                })
              }
            
          </tbody>
        </table>
      </>

  )

}

export default Index;