import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((store) => store.restaurant);

  return <div className="mt-10 text-xl p-5">Home</div>;
};

export default Home;
