import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { FaFireFlameCurved } from "react-icons/fa6";
import Error from "./Error";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState();

  console.log(products);

  useEffect(() => {
    api
      .get(`/products?restaurantId=${id}`)
      .then((res) => setProducts(res.data));
  }, [id]);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <FaFireFlameCurved className="text-red-500" />
        Popüler
      </h1>
      <p className="text-gray-600 my-2">
        Restoranın en çok tercih edilen ürünleri
      </p>

      {error ? (
        <Error msg={error} />
      ) : !products ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="my-20 text-center">Restoran servis saatleri dışındadır</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5 mt-4">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
