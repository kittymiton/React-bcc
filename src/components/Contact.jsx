import { useState } from "react";

export const Contact = () => {

  // ★★処理のポイント stateで宣言した値とvalue属性、更新用関数をonChangeのイベントハンドラとして設定
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const clearVal = () => {
    setName("");//オブジェクトにする必要あるかな？ひとつしかプロパティがないから必要なさそう
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefaut(); // フォームのデフォルトの送信動作を防ぐ

    try {
      const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),// JSON.stringifyは最初の引数にオブジェクトを取り、そのオブジェクトのプロパティを含むJSON文字列を生成。複数の変数を直接渡すことはできません。オブジェクトを形成してからJSON.stringifyを呼び出す必要があります。
      });

      if (!res.ok) {
        throw new Error('status error');
      };
      const data = await res.json();
      console.log(data);
      alert('送信しました');

    } catch (error) {
      console.error(error);
    }
    await clearVal();
  };


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1 className="contact-title">お問い合わせ</h1>
        <div>
          <label htmlFor="name">お名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          //onChange={e => console.log(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">本文</label>
          <textarea
            id="message"
            value={message}
            rows="8"
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">送信</button> {/* formの送信をトリガー */}
        <button type="button" onClick={clearVal}>クリア</button>
      </form>
    </main>
  );
};
