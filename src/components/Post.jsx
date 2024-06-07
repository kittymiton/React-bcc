import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Post = () => {

  // react-routerのuseParamsを使うと、URLのパラメータを取得できます。動的なルートパスで指定されたパラメータのidをコンポーネント内で利用。
  const { id } = useParams();
  const [post, setPost] = useState([]);// undefindになるので用意
  const [loading, setLoading] = useState(false);// 初期ロード時にはローディング状態を無効にセット

  // リクエスト送信
  useEffect(() => {

    const fetcher = async () => {

      // フェッチが開始される前にローディング状態を有効にする
      setLoading(true);

      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);

      // const data = await res.json();分割代入でjsonからpostを取り出す
      //console.log(data);
      const { post } = await res.json();

      setPost(post);

      // フェッチが完了した後にローディング状態を無効にする
      setLoading(false);
    };

    fetcher();
  }, [id]);

  // findは配列から条件一致する最初の要素を見つける。
  // idが文字列である可能性があるためNumber関数でidを数値に変換。
  //const post = res.data.find(post => post.id === Number(id));

  // 記事取得中は読み込み中であることを示します。
  if (loading) {
    return <div>読込中・・・</div>
  };

  // URLのidがpostsの中に存在しなかった場合にundefined防止。
  if (!loading && !post) {
    return <div>記事が存在しません</div>
  };
  // 日付を変換
  //    const formatDate = dateString => {
  //    const date = new Date(dateString);
  //     return date.toLocaleDateString("ja-JP");
  //   }
  // 　↓
  //   new Date().toLocaleDateString("ja-JP")

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
