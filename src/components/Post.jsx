import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

export const Post = () => {
  //現在のURLのパラメータを取得。動的なルートパスで指定されたパラメータidをコンポーネント内で利用。
  const { id } = useParams();
  //findメソッドは配列から条件に一致する最初の要素を見つける。idが文字列形式である可能性があるためNumber関数でidを数値に変換。これにより、post.idとidが正しく比較され、期待通りの結果が得られるようになります。
  const post = posts.find(post => post.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP");
  }

  return (
    <>
      <div className="post-detail">
        <img src={post.thumbnailUrl} alt={post.title} />
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
    </>
  );
};
