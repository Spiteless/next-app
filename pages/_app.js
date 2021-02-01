import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartProvider from "../context/Cart";
import Cart from "../components/Cart";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap");

  /* background: linear-gradient(to right, #fc00ff, #00dbde); */
  background-image: url("https://images.pexels.com/photos/2645414/pexels-photo-2645414.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  object-fit: contain;
  font-family: "Padauk", sans-serif;
  color: #444;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
        <Footer />
      </Container>
    </CartProvider>
  );
};

export default MyApp;
