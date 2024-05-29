import { Posts } from "./components/Posts";
import { Contact } from "./components/Contact";
import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};
