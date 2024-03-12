import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Layout() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <div className="container MainParent">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
