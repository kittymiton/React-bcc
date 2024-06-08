import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// ★★処理の流れ
// 最初はデータは空ですが(この時にuseState使用)、フェッチでページ読み込み時に一度だけデータを取得(この時にuseEffectのCB関数内で関数を使用)し、画面更新を行う(この時にuseState使用)

// 1:初期状態の設定: 最初に非同期で取得するデータの初期状態として「空配列やnull」などをuseStateフックで設定します。これにより、データがまだ取得されていない状態を表現します。
// 2:非同期データの取得: ページ読み込み時に、useEffectフックのCB関数内で非同期データの取得を行います。この時、通常はAPIから「データをフェッチする関数を呼び出し」ます。
// 3:データの更新: データの取得が成功すると、useEffectフックのCB関数内でuseStateフックの状態更新関数を使用して、取得したデータを状態に「設定」します。これにより、コンポーネントが再レンダリングされ、画面上に新しいデータが表示されることになりす。
// 4:画面の更新: 「状態が更新されると、Reactはコンポーネントを再レンダリング」し、画面上に新しいデータが表示されます。このプロセスにより、ユーザーに対して最新の情報が提供されます。
// このプロセスを通じて、useStateフックは状態の管理と更新を行い、useEffectフックは非同期データの取得やその他の副作用を効果的に扱うために使用されます。これにより、アプリケーションはデータの取得が完了するまで待つことなく、ユーザーに対して迅速にレスポンスを提供し、画面の更新を行うことができます。

export const Posts = () => {

  // 取得したデータを詰める用のstateを定義
  const [posts, setPosts] = useState([]); // 初期値[空配列]を設定しないとpostsがundefindになりmapメソッドがないのでエラーになる。postsがnullやundefinedであってもエラーにならずに安全にmap関数を実行できるようにするには?.で、左側の式がnullやundefinedを評価した場合、右側の式は評価されず、結果としてundefinedが返されます。これはAPIからデータを受け取りそれを表示するUIコンポーネントでよく使われます。APIのレスポンスが期待通りでない場合や、データのロードが完了していない場合などに備えて、安全性を高めるために使用されます。

  const [loading, setLoading] = useState(false);// Loading状態を状態管理することで、アプリケーションは非同期処理が完了するまで待つことなく、ユーザーに対して迅速にレスポンスを提供し、画面の更新を行うことができます。


  // 関数コンポーネント内は純粋関数として保つ必要があり、非同期通信のような副作用はuseEffectの中で書く。 副作用とは、関数の実行過程で外部の状態を変更する操作を指します。非同期通信、タイマーの設定、サブスクリプションの開始などが副作用に該当します。これらの操作は、副作用関数をコンポーネントの本体から分離させ関数コンポーネントのレンダリングとは独立して行われるべきです。
  useEffect(() => {

    // useEffectのCBに直接asyncがつけられないので、CB内でfetcher関数を定義
    const fetcher = async () => {

      setLoading(true);

      // リクエスト送信
      // awaitキーワードを使用して非同期処理の完了を待つ必要があります。
      const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');

      // HTTPレスポンスをJSON形式に解析し、その結果をdataに格納
      // このステップも非同期に行われるため、awaitキーワードを使用して非同期処理の完了を待ちます。
      //const data = await res.json();
      const { posts } = await res.json();
      setPosts(posts);
      //console.log(data); // res.json()から返されたdataはJSONオブジェクト全体で、このオブジェクトの中にはpostsというキーが存在し、その値は配列になっています。data自体はオブジェクトですが、その中に含まれるpostsキーの値は配列です。

      //console.log(data.posts); // data.postsを使用することで配列にアクセスできます。

      // postsプロパティのみを状態として設定。
      // postsには配列が格納され、その後の処理で直接配列操作を行うことができます。
      //setPosts(data.posts);// fetcher();の直後にsetPosts(data.posts);を呼び出すと、非同期操作が完了する前にsetPosts関数が呼び出される可能性があります。これは非同期操作が非同期に行われるため、fetch関数の結果を得る前にsetPosts関数を呼び出すと、data.postsが未定義になる可能性があります。この問題を解決するためには、非同期操作が完全に完了し結果が得られた後にのみsetPosts関数を呼び出すようにする必要があります。「useEffectフック内で非同期関数を定義しその関数内で非同期操作を行い、結果を得た後にsetPosts関数を呼び出すことでこの問題を解決できます。」したがって、useEffectフックの第二引数に空配列を渡すことで副作用関数の再実行を制御することは有効ですが、それが非同期操作の結果を得た後にのみsetPosts関数を呼び出すことを保証するわけではありません。fetcher関数内での状態更新は、非同期処理の結果を直接扱うことができるため、推奨されます。
      //setPosts(data.posts)をfetcher()の後に行うには、
      //await fetcer();
      //setPosts(data.posts)
      //という感じで「fetcherを待つ必要があります」が、useEffectの仕様としてCBに非同期関数を渡すことができません。＝await fetcer();は書けない。なので、「fetcher自体を非同期にし」＝asyncにし、「その中で」setPostを行う必要があります！
      //→非同期じゃなくなって空のデータがつめらたり中途半端な状態のデータになる可能性があるということ

      setLoading(false);
    }
    // 定義したfetcher関数を実行してデータ取得
    fetcher();
  }, []);

  if (loading) {
    return <div>読込中・・・</div>
  };

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
