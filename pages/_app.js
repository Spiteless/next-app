import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartProvider from "../context/Cart";
import CartSidebar from "../components/CartSidebar";

// import { Elements } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap");

  /* background: linear-gradient(to right, #fc00ff, #00dbde); */
  background-image: url("https://images.pexels.com/photos/2645414/pexels-photo-2645414.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  object-fit: contain;
  font-family: "Padauk", sans-serif;
  color: #444;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  /* min-height: 70vh; */
`

const MyApp = ({ Component, pageProps }) => {
  return (
    // <Elements stripe={stripePromise}>
      <CartProvider>
        <Container>
          <Normalize />
          <Navbar />
          <MainContent>
            <Page>
              <Component {...pageProps} />
            </Page>
          </MainContent>
          <Footer />
          <CartSidebar />
        </Container>
      </CartProvider>
    // </Elements>
  );
};

export default MyApp;
