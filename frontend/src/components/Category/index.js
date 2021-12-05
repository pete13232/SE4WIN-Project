import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Col, Row, Image, Carousel } from "react-bootstrap";
import Header from "../Header";
import "./style.css";
import { GET_CATEGORIES } from "../../Graphql/Queries";
import Slider from "react-slick";
import { QueryContext } from "../../context/query";
const Category = () => {
  const { queryState, setQueryState,  filterCategoryId, setFilterCategoryId } =
    useContext(QueryContext);
  const { data, error, refetch } = useQuery(GET_CATEGORIES, {});
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const sliders = () => {
    return categories.map((category) => {
      return (
        <div className="g-0 category" key={category} >
          <div className="card" md={2}>
            <Image alt="image" src={category.picURL} onClick={()=>{
              setFilterCategoryId(category.id)
              setQueryState(2)
            }} />
            <div className="card-img-overlay text-center">
              <h4>{category.name}</h4>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (data) {
      setCategories(data?.categories);
    }
  }, [data]);

  return (
    <>
      <Header text="Category"></Header>
      <div>
        <Slider {...settings}>{sliders()}</Slider>
      </div>
    </>
  );
};

export default Category;
