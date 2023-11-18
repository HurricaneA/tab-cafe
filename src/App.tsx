import "./App.css";
import Layout from "./components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import OrdersList from "./components/orders/orders-list";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Template } from "./components/pdf/template";

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
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/items" element={<Items />} />
            </Routes>{" "}
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
