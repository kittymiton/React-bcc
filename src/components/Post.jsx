import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const Post = () => {

  // react-routerのuseParamsで動的URLのパラメータ取得
  const { id } = useParams();

  const [post, setPost] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {

      setLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!res.ok) {
          throw new Error("データが見つかりません");
        }
        const { post } = await res.json();
        setPost(post);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [id]);


  if (loading) {
    return <div>読込中・・・</div>
  };


  if (error) {
    return <div>一覧記事取得エラー: {error.message}</div>
  }

  if (!loading && !post) {
    return <div>記事が存在しません</div>
  };

  return (
    <main>
      <div className="post-detail">
        <img src={post.thumbnailUrl} alt={post.title} />
        <div className="post-info">
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          <ul>{post.categories?.map(category =>
            <li key={category}>
              {category}
            </li>
          )}
          </ul>
        </div>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
};
