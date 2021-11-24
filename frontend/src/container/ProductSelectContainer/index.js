import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import ProductDetail from "../../components/ProductDetail";
import ProductDescription from "../../components/ProductDescription";
import { GET_PRODUCT_INFO } from "../../Graphql/Queries";

const ProductSelectContainer = () => {
  const { id } = useParams();

  const { data, error } = useQuery(GET_PRODUCT_INFO, {
    variables: { input: Number(id) },
  });

  const [product, setProduct] =  useState();

  useEffect(() => {
    if (data) {
       setProduct(data.product);
    }
  }, [data]);


  return (
    <>
      {product && (
        <div>
          <NavbarBootstrap />
          <Header text={product.name} />
          <ProductDetail
            picURL={product.picURL}
            name={product.name}
            price={product.price}
            stock={product.stock}
            productId={id}
          />
          <Header text="Description" />
          <ProductDescription category={product.category.name} desc={product.desc} />
        </div>
      )}
      {/* <div>
        <NavbarBootstrap />
        <Header text={product.name} />
        <ProductDetail
          picURL={product.picURL}
          name={product.name}
          price={product.price}
          stock={product.stock}
        />
        <Header text="Description" />
        <ProductDescription category={product.category} desc={product.desc} />
      </div> */}
    </>
  );
};

export default ProductSelectContainer;
