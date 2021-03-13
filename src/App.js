import "./App.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

import firstBg from "./assets/bg1.jpg";
import secondBg from "./assets/bg3.jpg";

const App = () => {
  return (
    <>
      <Header title="This is title" descr="This is Description!" />
      <Layout title="This is title" descr="This is Description!" urlBg={firstBg} />
      <Layout title="This is title" descr="This is Description!" colorBg="#e2e2e1" />
      <Layout title="This is title" descr="This is Description!" urlBg={secondBg} />
      <Footer />
    </>
  );
};

export default App;
