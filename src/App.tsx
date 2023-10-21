import "./App.css";
import Layout from "./components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Orders from "./pages/orders";
import Items from "./pages/items";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/items" element={<Items />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
