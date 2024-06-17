import { useState } from "react";
import { Label } from "./Label";
import { TextInput } from "./TextInput";
import { Textarea } from "./Textarea";
import { ErrorMessage } from "./ErrorMessage";
import { Button } from "./Button";
import { API_BASE_URL } from "../constants";

export const Contact = () => {

  // ★★送信処理のポイント
  // stateで宣言した値とvalue属性を紐づけ、更新用関数をonChangeのイベントハンドラとして設定し、ユーザーの入力をリアクティブに反映し、状態を更新。そのステートに保存した値をsubmitで送信。送信処理前にバリデーション関数を実施。
  const [name, setName] = useState(""); // 初期値を空で設定すると偽(false)
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const clearHandler = () => {
    setName("");
    setEmail("");
    setMessage("");
  };
  // const clearHandler = ({ name, email, message }) => {
  //   setName(name);
  //   setEmail(email);
  //   setMessage(message);
  // };

  // ★★ユーザー入力値エラー処理のポイント
  // エラーメッセージ表示用のステートに、各項目の内容に応じたメッセージを保存して表示。
  // バリデーション用の関数にフラグを設定し、エラー存在の判定を真偽値で行う。エラーが存在した場合フラグを反転させて判定する。同時にエラーメッセージは変数に格納することで、項目の内容に応じたメッセージの出し分けが可能。内容に応じたメッセージをステートに保存。最終的にエラーがある場合は送信を不可とする。

  // エラーメッセージを詰める用
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [messageErr, setMessageErr] = useState("");

  const validate = () => {

    // フラグ変数で条件が真（true）または偽（false）になるまで値を変更するために使用。
    let flag = true; // 入力が有効かどうかのフラグ。

    // 変数を使用してエラーメッセージを一時的に保存。この変数は関数スコープ内で定義されているためその作用域内でのみアクセス。
    let nameLowError = "";
    let emailLowError = "";
    let messageLowError = "";

    // if (name === "") {
    //   setNameErr("お名前は必須です");
    //   return false;
    // } else if (name.length > 30) {
    //   setNameErr("お名前は30文字以内で入力してください。");
    //   return false;
    // }
    //setNameErr("");

    console.log(Boolean(name));
    console.log(Boolean(flag));

    if (!name) { // nameがtrueじゃない(＝false)のとき。nameがtrueというのは何かしら入力があったということ。初期値が空だったから。真偽値に変換されたものがfalsyであれば下記を実行。
      nameLowError = "お名前は必須です";
      flag = false; // エラーのパターンのどれかに該当すると、その時点でflagがtrue→falseになり、以降ユーザーが修正しない限りflagはfalseのままになる。（そして、handleSubmit関数内if (!validate()) returnの記述により、送信できないままになる。）
    } else if (name.length > 30) {
      nameLowError = "お名前は30文字以内で入力してください。";
      flag = false;
    }
    //console.log(Boolean(flag));

    if (!email) {
      emailLowError = "メールアドレスは必須です";
      flag = false;
    } else if (!email.match(/.+@.+\..+/)) { // 正規表現の開始と終了を示すスラッシュ。.は任意の文字を表し、+は直前の文字が1回以上繰り返されることを示します。「.+」は1文字以上の任意の文字列。「.+」「@」「.+」「.」「.+」→　a@a.aならOK
      emailLowError = "メールアドレスの形式が正しくありません。";
      flag = false;
    }
    //console.log(Boolean(flag));

    if (!message) {
      messageLowError = "本文は必須です。";
      flag = false;
    } else if (message.length > 500) {
      messageLowError = "本文は500文字以内で入力してください。";
      flag = false;
    }
    //console.log(Boolean(flag));

    // エラーメッセージをセット
    setNameErr(nameLowError);
    setEmailErr(emailLowError);
    setMessageErr(messageLowError);

    console.log(Boolean(flag));

    // validate関数内のflagの内容を呼び出し元に返す。すると呼び出し元であるhandleSubmit関数はvalidate関数が帰ってきたflagからtrueかfalseかを判定。validate関数内のバリデーション処理は実行されてflagが最終的にtrueになっていても、呼び出し元にtrueかfalseかを返さなければ、単にバリデーションをしただけになってしまう。関数が何も返さない場合、その関数の結果はundefinedとなり、undefinedはfalseに等しく評価されるため、ブール型の値としては"偽"（falsy）と扱われます。validate関数が何も返さない場合（つまり、returnステートメントがない場合）、validate関数がflag変数をtrueに設定したにも関わらず、handleSubmit関数はvalidate関数の結果としてundefinedを受け取ります。そして、handleSubmit関数内での条件分岐ではfalseとして扱われ、呼び出し以降の処理がされず、結果、送信できないことになる。
    return flag;

  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // ユーザーがフォームを送信するとブラウザはデフォルトでページをリフレッシュするというHTMLの仕様があるが、カスタムの処理（例えば、サーバーへの非同期通信）を行いたい場合フォームデータがサーバーに送信される前にページ全体が更新されるのを防ぐ。

    // validate関数が偽を返した場合、すぐに処理を中断し関数から抜け出す。
    if (!validate()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content-Typeヘッダをapplication/jsonに設定するとリクエストがJSON形式のデータを含んでいることを明示的に伝え、サーバー側で適切に処理されます。
        },
        body: JSON.stringify({ name, email, message }), // stateにユーザーからの入力や前処理済みのデータを保持されている値を参照。するために使用。JSON.stringifyは最初の引数にオブジェクトを取り、そのオブジェクトのプロパティを含むJSON文字列を生成。複数の変数を直接渡すことはできません。オブジェクトを形成してからJSON.stringifyを呼び出す必要があります。JavaScriptのオブジェクトをJSON形式の文字列に変換。
      });

      if (!res.ok) {
        throw new Error('status error');
      };
      const { data } = await res.json();
      console.log(data);
      alert('送信しました');

    } catch (error) {
      console.error(error);
    }
    clearHandler();
  };

  return (
    <main>
      <h1 className="contact-title">お問い合わせ</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="name">お名前</label> */}
          <Label htmlFor="name" tag="お名前" />{/* labelはID属性と同じにすると関連付けられたラベルが自動的にフォーカスされる */}
          <div className="write-area">
            {/* <input
              id="name"
              type="text"
              value={name} // 画面に表示用。nameステートに保持されている値を参照して表示する。テキスト入力フィールドの値を制御。value属性だけを設定し、onChangeイベントハンドラーがない場合入力フィールドは何も反映されない。（react以外ではe.target.valueとするが、そのように設定していないため）
              onChange={e => setName(e.target.value)}
            // onChangeハンドラーが入力フィールドの値が変更されるたびに呼び出され、nameを更新。ユーザーが入力値を変更するたびにその変更がステートに反映されフォームの送信時に最新の入力値が利用できます。
            /> */}
            <TextInput
              id="name"
              type="text"
              value={name}
              //onChange={setName}}
              onChange={value => setName(value)}
            />{/*どちらの書き方も関数を使用してステートを更新していますが、valueを引数にとると、子コンポーネントの内容が変わっても対応しやすくなります。これはonChangeイベントハンドラが引数に渡ってきたValueを直接setName関数に渡すため、イベントオブジェクトの詳細（例えば、event.target.valueの取得）を隠蔽することができるからです。イベントオブジェクトの構造やその中の特定のプロパティ（target.valueなど）に依存することなく値の更新を行うことができます。これにより子コンポーネントの内部実装が変更されても、親コンポーネント側のイベントハンドラの変更は不要になります。逆にonChange={setName}の形式を使用すると、setName関数がイベントオブジェクトeを受け取りその中から新しい値target.valueを抽出するので関数は使用していますが、子コンポーネントの内部実装に依存する可能性があります。子コンポーネントの内容が変更されると、親コンポーネント側でのイベントハンドラの修正が必要になる可能性があります。したがって、onChange={(value) => setName(value)}の形式は、子コンポーネントの内容が頻繁に変更される場合や、イベントハンドラの再利用性を重視する場合に特に有利です。この形式は、親コンポーネントが子コンポーネントの内部実装に依存しないようにすることで、コードの保守性と柔軟性を高めることができます。*/}
            {/* {nameErr && <p>{nameErr}</p>} */}
            <ErrorMessage message={nameErr}></ErrorMessage>
          </div>
        </div>
        <div>
          <Label htmlFor="email" tag="メールアドレス" />
          <div className="write-area">
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={value => setEmail(value)}
            />
            <ErrorMessage message={emailErr}></ErrorMessage>
          </div>
        </div>
        <div>
          <Label htmlFor="message" tag="本文" />
          <div className="write-area">
            <Textarea
              id="message"
              type="message"
              value={message}
              onChange={value => setMessage(value)}
              rows={12}
            />
            <ErrorMessage message={messageErr}></ErrorMessage>
          </div>
        </div>
        <div>
          {/* <button type="submit">送信</button> {/* formの送信をトリガー。type="submit"属性を使用するとボタンがフォームの一部として機能しフォームを送信 */}
          <Button
            type="submit"
            tag="送信"
          />
          {/* <button
            type="button"
            onClick={clearVal}>クリア</button>*/}
          <Button
            type="button"
            tag="クリア"
            //onClick={() => clearHandler({ name: "aa", email: "aa@a.com", message: "こんにちは" })}// 引数を“明示的に“渡す場合にCBでかく。onClickに渡すのは関数自体。CBではなく、clearHandler()とすると、JSXを作る時に実行され戻り値returnが帰る。returnがない場合はundefind。
            onClick={clearHandler}
          />
        </div>
      </form>
    </main>
  );
};
