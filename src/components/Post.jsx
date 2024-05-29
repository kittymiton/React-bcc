import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

export const Post = () => {
  //現在のURLのパラメータを取得し、動的なルートパス（例 /users/:userId）で指定されたパラメータ（userId）をコンポーネント内で利用することができます。
  const { id } = useParams();
  //findメソッドは配列から条件に一致する最初の要素を見つけるために使用されます。idが文字列形式である可能性があるためNumber関数を使用してidを数値に変換しています。これにより、post.idとidが正しく比較され、期待通りの結果が得られるようになります。
  const post = posts.find(post => post.id === Number(id));

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
