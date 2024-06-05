import { Posts } from "./components/Posts";
import { Contact } from "./components/Contact";
import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { NoMatch } from "./components/NoMatch";
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />{/*データ構造がidをキーとして持つ場合、URLパスも:id形式で定義。*/}
        <Route path="/contact" element={<Contact message="hello contact" />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
