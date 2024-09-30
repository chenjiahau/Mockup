import "./App.css";

import { AppContextProvider } from "./AppContext";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AppContextProvider>
        <div className='layout'>
          <Header />
          <Main />
          <Footer />
        </div>
      </AppContextProvider>
    </>
  );
}

export default App;
