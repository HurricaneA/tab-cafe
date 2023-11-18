import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { NavigationBar } from "./components/navbar/NavigationBar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import { Stats } from "./pages/Stats";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavigationBar />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/items" element={<Items />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>{" "}
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
