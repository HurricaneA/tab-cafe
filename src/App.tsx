import "./App.css";
import Layout from "./components/layout";
import BillerItems from "./components/biller/biller-items";
import { QueryClient, QueryClientProvider } from "react-query";
import AddItem from "./components/biller/add-item";
import { Button } from "react-bootstrap";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <br></br>
          <Button
            onClick={() => setShowMenu((prevState) => !prevState)}
            style={{ textAlign: "end" }}
          >
            Menu
          </Button>
          {showMenu && <AddItem />}
          <BillerItems />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
