import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import useCart from "../../hooks/useCart";

// pages\products\[product].js
// hooks\useCart.js

const Title = styled.div`
  /* display: flex;
  align-items: flex-end; */
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  padding-top: 0px;
`;

const SubTitle = styled.p`
  margin-top: -1.25rem;
  color: #666;
`;

const Price = styled.span`
  font-size: 2rem;
  background: #000;
  padding: 0.25rem 1rem;
  color: white;
  font-weight: 800;
  margin-bottom: 1rem;
  display: inline-block;

  border-radius: 5px;
  /* border: 10px solid; */
  /* border-image-slice: 1; */
  /* border-width: 4px; */

  /* border-image-source: linear-gradient(to left, #EEB609, #B78628); */

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 1rem 6px #B78628;
    cursor: pointer;
    /* transition: transform 0.2s ease-in; */
  }
`;

const Product = ({ product: { data, content } }) => {
  const { addItemToCart } = useCart();

  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(data);
  };

  const html = marked(content);
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
      </Title>
        <SubTitle>{data.description}</SubTitle>
      <Price onClick={handleClick}>${data.price / 100}</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};

export const getStaticPaths = () => {
  // product pages to generate
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filepath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filepath).toString();
  const { data, content } = matter(fileContent);

  return {
    props: {
      product: {
        data,
        content,
      },
    },
  };
};

export default Product;
