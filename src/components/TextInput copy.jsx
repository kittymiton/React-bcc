export const TextInput = ({ id, type, value, onChange }) => {
  //console.log(props);
  //const { id, type, value, onChange } = props;

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)} // 親から渡されたonChangeプロパティを通じて、入力された値を上位コンポーネントに通知。上位コンポーネントは入力値の変更を追跡し、適切に対応することができます。
    //1:onChange イベントは、Reactでフォームの入力フィールドの値が変更されたときに発火するイベントハンドラです。ユーザーが入力をするとonChange関数が発火し、値を取得。
    //2:onChange関数の戻り値を親コンポーネントから受け取った onChangeプロパティの値（この場合は setName関数）に返すことで、入力フィールドの値の変更を上位コンポーネントに伝えます。
    />
  );
};
