import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/contact">お問い合わせ</NavLink>
        </li>
      </ul>
    </nav>
  );
};
