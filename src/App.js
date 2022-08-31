import { Header, AuthHeader } from "./components/Headers";
import { Home } from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "./components/notLoggedIn";
import { Settings, NewArticle, EditArticle } from "./components/LoggedIn";
import { useAuth } from "./components/Auth";
import Profile from "./components/Profile";
import { ArticleHeader } from "./components/Article";
import { Provider } from "react-redux";
import { store } from "./store";

function App(data) {
  const { auth } = useAuth(); //kullanicin giris yapmis mi kontrol ediyoruz
  const value = data.data; //kullanici bilgilerini aliyoruz
  return (
    <Provider store={store}>
      {auth ? <AuthHeader data={value} /> : <Header />}
      <Routes>
        <Route path="/" element={<Home data={value} />} />
        <Route
          path="/login"
          element={auth ? <Navigate replace to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate replace to={"/"} /> : <Register />}
        />
        <Route
          path="/editor"
          element={auth ? <NewArticle /> : <Navigate replace to={"/"} />}
        />
        <Route
          path="/settings"
          element={
            auth ? <Settings data={value} /> : <Navigate replace to={"/"} />
          }
        />
        <Route path="/@:username" element={<Profile data={value} />} />
        <Route path="/article/:id" element={<ArticleHeader data={value} />} />
        <Route path="/editor/:id" element={<EditArticle />} />
      </Routes>
    </Provider>
  );
}

export default App;
