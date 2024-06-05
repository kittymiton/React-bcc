import { posts } from "../data/posts"
import { Link } from 'react-router-dom'

export const Posts = () => {
  // 日付を変換
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP");
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`posts/${post.id}`}>
            <div className="post">
              <div className="post-info">
                <p>{formatDate(post.createdAt)}</p>
                <ul>{post.categories.map(category => (
                  <li key={category}>
                    {category}
                  </li>
                ))}
                </ul>
              </div>
              <h1>{post.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>

  )


}
