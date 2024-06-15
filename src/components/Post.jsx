import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const Post = () => {

  // react-routerのuseParamsを使うと、URLのパラメータを取得できます。動的なルートパスで指定されたパラメータのidをコンポーネント内で利用。
  const { id } = useParams();
  const [post, setPost] = useState([]); // undefindになるので用意

  // ★★error処理の流れ
  // フェッチの関数内でtry~catchでフェッチの処理を囲み、http関連のエラーがスローされるとcatchブロックでスローされたエラーをステートに格納しエラーメッセージを画面に表示。
  const [error, setError] = useState(null); // 初期値[]だとerrorステートが空配列であることが常に真（truthy）であるため、if (error) の条件分岐が常にマッチしてエラーメッセージが表示されてしまう。初期値をnullに設定すると、エラーが発生しない限りnullのまま保持。nullはfalsyであるため、if (error) の条件分岐はエラーが発生していない場合にはマッチしない。

  // ★★loading処理の流れ
  // 最初はローディングは無効（false）設定ですが、フェッチ開始前にloadingを有効(true)反転状態に変更。再レンダリングで「読込中...」と表示。フェッチ完了しデータ更新後にローディングを無効(false)にし、再レンダリング。
  const [loading, setLoading] = useState(false);// 初期ロード時にはローディング状態を無効にセット

  // リクエスト送信
  useEffect(() => {

    const fetcher = async () => {

      // fetch開始前にローディング状態を有効にし、コンポーネントが再レンダリングされることでloadingステートに基づいて異なるUIを表示することができます。loadingがtrueの場合に「読込中...」と表示するようなローディングインジケーターを表示することができます。
      setLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}`);

        //fetchが失敗した場合、HTTPレスポンスのステータスコードに基づくエラーハンドリング処理。エラーがスローされる。※CORSエラーなどの非HTTPエラーに対しては効果的ではない。
        if (!res.ok) {
          throw new Error('データが見つかりません');
        }

        // const data = await res.json();分割代入でjsonからpostを取り出す
        //console.log(data);
        const { post } = await res.json();
        setPost(post);

        // エラーがスローされるとcatchが実行され、スローされたエラーがsetError関数に渡されerror状態に保存。コンポーネントのレンダリングロジックで if (error) { return <div>Error: {error.message}</div> } の条件分岐がマッチし、エラーメッセージが画面に表示されます。
      } catch (error) {
        setError(error);

      } finally {
        // フェッチが完了した後にローディング状態を無効にする。setLoading(false);で状態が更新されると、再びコンポーネントが再レンダリングされます。しかし、もしpostの内容がフェッチ成功前と後で同じであれば、Reactは新旧の状態が同じであると判断し、実際にはDOMを更新せずに済む場合があります。再レンダリングは発生しますが、もし新旧の状態が同じであれば、ReactはDOMを更新せずに済む場合があります。これは、Reactが不要なDOM操作を最適化するための機能です。再レンダリングがパフォーマンスに大きな影響を与えるのは、大規模なDOM操作や高頻度での再レンダリング（例えば、状態が頻繁に更新される）である場合です。ただし、Reactの再レンダリングは非常に高速であり、ほとんどの場合ではユーザーにとっては気づけないほど早いです。不要な再レンダリングの防止: React.memoやPureComponentを使用して、コンポーネントが再レンダリングされる条件を厳格に制御します。非同期処理の中で状態を更新する際には、必要な情報が揃った後に一度に状態を更新することで、不要な再レンダリングを減らすことができます。
        setLoading(false);
      }
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

  if (error) {
    // JSのErrorオブジェクトのmessageプロパティを表示
    // errorオブジェクトがnullやundefinedである場合、またはmessageプロパティが存在しない場合、{error.message}は何も表示されません。
    return <div>個別記事取得エラー: {error.message}</div>
  }

  // URLのidがpostsの中に存在しなかった場合にundefined防止。
  // fetchが成功したものの、取得したデータが何もない状態である場合。これはAPIからデータが返ってきたが、そのデータが何も含まれていない、または期待していたデータが存在しない場合。この場合、データ自体は取得できていますがその内容が何もないという状態。データの読み込みが完了し、取得したデータ (post) が空である場合に、"記事が存在しません" というメッセージを表示する。
  if (!loading && !post) {
    return <div>記事が存在しません</div>
  };

  // if (!post || post.status === '下書き中') {
  //   return <div>記事が存在しません</div>;　
  // }postが特定の値（例えば、"下書き中" という文字列やオブジェクト）を持つ場合に、その状態を反映。例えば、postがオブジェクトであり、その中にcontentというプロパティがあるが、その値が空文字列やnullである場合、この条件分岐はそれを"記事が存在しない" と判断することになります。
  // if (!post || Object.keys(post).length === 0) {
  //   return <div>記事が存在しません</div>;
  // } else if (post.content.trim() === '') {
  //   return <div>記事の内容がありません</div>;
  // } else {
  //   // 記事が存在し、内容もある場合の処理
  // }

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
