import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/Layout";
import Chat from "../pages/chat";
import Ads from "../pages/ads";

const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* <Layout /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/ads" element={<Ads />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;