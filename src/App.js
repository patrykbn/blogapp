import { Route, Routes } from "react-router-dom";
import Navbar from './components/common/Navbar/Navbar';
import Main from './components/pages/Main/Main';
import About from './components/pages/About/About';
import Post from './components/pages/Post/Post';
import AddPost from './components/pages/AddPost/AddPost';
import EditPost from './components/pages/EditPost/EditPost';
import NotFound from './components/pages/NotFound/NotFound';
import Footer from './components/common/Footer/Footer';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = props =>  {
  return (
    <div className="blogApp">
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/post/addPost' element={<AddPost />} />
        <Route path='/post/:id/editPost' element={<EditPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
