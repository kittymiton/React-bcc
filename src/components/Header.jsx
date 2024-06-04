import { NavLink, useLocation } from 'react-router-dom'

export const Header = () => {

  // useLocationはReact Routerのフックの一つで、現在の場所（URLのパス名など）にアクセスするためのものです。これによりコンポーネントがレンダリングされるときに現在のパス情報(location.pathname)を取得できます。
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li>{/* <NavLink>のデフォルト動作によって現在のページと一致するリンクにactiveクラスが自動的に適用されるので、パスがisActiveかつルートのときはactiveクラスを適用しないようにする。*/}
          <NavLink
            //NavLinkコンポーネントのclassNameプロパティには動的なクラス付けのために関数を渡すことができ、この関数はリンクのアクティブ状態を示すオブジェクトを引数として受け取ります。ReactのコアAPIでは、classNameプロパティに文字列を直接渡すことが一般的ですが、一部のライブラリやコンポーネントライブラリでは、動的なクラス付けのために関数を渡すことが可能。
            className={isActive =>
              isActive && location.pathname !== '/'
                ? 'active no-hover'
                : 'no-hover'
            }
            to="/">Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            className={isActive =>
              isActive
                ? 'active'
                : undefined
            }
            to="/contact">お問い合わせ</NavLink>
        </li>
      </ul>
    </nav>
  );
};
