import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const ProductCard = styled.div`
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    box-shadow: 0px 0px 1rem 6px #fefefe;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0.7rem;
  right: 1rem;
  font-size: 2.2rem;
`;

const Name = styled.h1`
  margin-top: 0px;
`

const Button = styled.button`
  background: linear-gradient(to right, #000, #000);
  color: inherit;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 0.32rem;
  font-weight: 600;
  color: white;
  position: absolute;
  bottom: 0.65rem;
  left: 1rem;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;


const renderProduct = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <ProductCard>
          <Name>{product.name}</Name>
          <p>{product.description}</p>
          <Button onClick={handleClick}>Add to cart</Button>
          <Price>${product.price / 100}</Price>
        </ProductCard>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  const { products } = props
  const { cart, addItemToCart } = useCart();
  console.log(cart);

  const sortedProducts = products.sort( (a, b) => a.sort_order - b.sort_order )
  return (
    <ProductsContainer>
      {console.log(sortedProducts)}
      {sortedProducts.map((product) => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    // read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    // pull out frontmatter => name
    const { data } = matter(fileContent);
    // return name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug,
    };
    return product;
  });

  return {
    props: {
      products,
    },
  };
};

export default HomePage;
