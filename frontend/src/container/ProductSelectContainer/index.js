import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_INFO } from "../../Graphql/Queries";
import ProductDescription from "../../components/ProductDescription";
import NavbarBootstrap from "../../components/NavbarBoostrap";
import Header from "../../components/Header";
import ProductDetail from "../../components/ProductDetail";

const ProductSelectContainer = () => {
  const { id } = useParams(); //get id from url

  const { data } = useQuery(GET_PRODUCT_INFO, {
    // query product information
    variables: { input: Number(id) },
  });

  const [product, setProduct] = useState(); //product state

  useEffect(() => {
    //initial product data when data change
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
            s
            productId={id}
          />
          <Header text="Description" />
          <ProductDescription
            category={product.category.name}
            desc={product.desc}
          />
        </div>
      )}
    </>
  );
};

export default ProductSelectContainer;
