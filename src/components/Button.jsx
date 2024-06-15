export const Button = ({ type, tag, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick} //クリックイベントに対するハンドラ関数を実行するようにセット。ハンドラ関数を実行しているのは親。
    //onClick={() => onClick()}// 関数が他の関数を引数として受け取る必要がある場合や、関数の実行前に特定の条件をチェックする必要がある場合など。
    >{tag}</button>
  );
};
