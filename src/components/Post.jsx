import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

export const Post = () => {

  //URLのパラメータを取得。動的なルートパスで指定されたパラメータのidをコンポーネント内で利用。
  const { id } = useParams();

  //findは配列から条件一致する最初の要素を見つける。
  //idが文字列である可能性があるためNumber関数でidを数値に変換。
  const post = posts.find(post => post.id === Number(id));

  //URLのidがpostsの中に存在せずundefined防止。
  if (!post) <div>記事が存在しません</div>;

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
