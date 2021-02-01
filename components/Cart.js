import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { useRouter } from "next/router";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 300px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.2s ease-in;
`;

const X = styled(FiX)`
  font-size: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  /* border-bottom: 1px solid #efefef; */
  margin: 0 0 0 0;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.0rem;
  margin-bottom: 0.75rem;
  margin-top: 2.25rem;
  position: relative;
`;

const PlusMinus = styled.span`
  /* border: 1px red solid; */
  border-bottom: 2px solid #a0a0a0;
  position: absolute;
  font-size: 1.3rem;
  top:1.2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const Ticker = styled.span`
  margin-bottom: 0.2rem;
  font-weight: 800;
  &:hover{ cursor: pointer;}
`

const Ul = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #000, #000);
  font-size: 2rem;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;

  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;

  border-image-source: linear-gradient(to left, #EEB609, #B78628);

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 1rem 6px #B78628;
    /* transition: transform 0.2s ease-in; */
  }

  &:hover {
    cursor: pointer;
  }
`;

const Cart = () => {
  const {
    cart,
    isOpen,
    openCart,
    closeCart,
    total,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
  } = useCart();
  const router = useRouter();

  const handleClick = (e) => {
    console.log(e)
    closeCart();
  };

  const navigateToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <X name="X" onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
        {cart.length > 0 ? (
          <>
            <Ul>
              {cart.map((item) => {
                return (
                  <Item>
                    <span>
                      {item.qty}x {item.name}
                    </span>
                    <PlusMinus>
                      <Ticker
                        onClick={() => {
                          addItemToCart(item)
                        }}
                      >+</Ticker>
                      <Ticker
                        onClick={() => {
                          decreaseItemQuantity(item)
                        }}
                      >-</Ticker> 
                    </PlusMinus>
                    <span>${item.price / 100}</span>
                  </Item>
                );
              })}
            </Ul>
            <Total>
              <span>Total</span>
              <span>${total / 100}</span>
            </Total>
            <Button onClick={navigateToCheckout}>Checkout</Button>
          </>
        ) : (
          <p>Cart is empty!</p>
        )}
      </Content>
    </Container>
  );
};

export default Cart;
