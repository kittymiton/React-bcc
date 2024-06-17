import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../constants";

export const Posts = () => {

  // 初期値[空配列]設定でpostsがundefindでmapメソッドのエラー回避
  const [posts, setPosts] = useState([]);

  // Loadingの格納・表示
  // 初期ロード時は無効
  const [loading, setLoading] = useState(false);

  // featchエラーの格納・表示
  // JSで空配列[]はtruthy。nullはfalsy。
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        // ローディングインジケーター表示
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/posts`);
        if (!res.ok) {
          // consoleに表示
          throw new Error("データが見つかりません");
        }
        const { posts } = await res.json();
        setPosts(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, []);

  // ローディング中
  if (loading) {
    return <div>読込中・・・</div>
  };

  // fetchエラー
  if (error) {
    return <div> 記事取得エラー: {error.message}</div>
  };

  // 取得したデータが空である場合
  if (!loading && !posts) {
    return <div>記事が存在しません</div>
  };

  return (
    <main>
      <ul>
        {/* 取得したpostsデータが配列なのでmapでloop */}
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`posts/${post.id}`}>
              <div className="post">
                <div className="post-info">
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
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
    </main>
  );
};
