import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "./styled/UnstyledLink";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

const Foot = styled.footer`
  background: white;
  padding: 2rem;
  margin-top: 5rem;
`;

const FootContainer = styled.div`
  /* padding-top: 3rem; */
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled(FiShoppingCart)`
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Footer = () => {
  const { openCart } = useCart();

  const handleClick = () => {
    openCart();
  };

  return (
    <Foot>
      <FootContainer>
        <Link href="/">
          <UnstyledLink>Lost Coast Chocolates</UnstyledLink>
        </Link>
      </FootContainer>
    </Foot>
  );
};

export default Footer;
