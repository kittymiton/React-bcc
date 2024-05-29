import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>
            Blog
          </li>
        </Link>
        <Link to="/contact">
          <li>
            お問い合わせ
          </li>
        </Link>
      </ul>
    </nav>
  );
};
