import { posts } from "../data/posts"

export const Post = () => {
  // 日付を変換
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP");
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
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
        </li>
      ))}
    </ul>

  )


}
