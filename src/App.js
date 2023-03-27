import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import Header from "./components/HeaderComponent";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Header/>
            </header>
            <main>
              <Routes>
                <Route path="/admin" element={<AdminScreen/>} />
                <Route path="/" element={<HomeScreen/>} exact />
              </Routes>
            </main>
            <footer>All right is reserved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
