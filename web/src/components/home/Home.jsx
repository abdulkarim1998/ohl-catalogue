import "./home.scss";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {  useNavigate } from "react-router-dom";
import { client } from "../../client";
import { useEffect, useState } from "react";


const fetchWithNumber = (number) => {
  let item;
  const type = number.length > 3 ? "sapNumber" : "hookupNo"
  const query = `*[_type=="materials" && ${type} == "${number}"]`
  console.log(query);
  client.fetch(query)
    .then(data => {
      item = data[0]
    }).catch(err => {
      console.log(err);
    })
    return item;
}


const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState();

  useEffect(() => {
    const query = '*[_type=="drawings" && drawingNumber == "2305-91607-0001"]';
    client
      .fetch(query)
      .then((data) => {
        setItems(data)

        data[0].itemsNumbers.forEach(number => fetchWithNumber(number))
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app__home">
      <h1 className="app__home-welcome">Welcome To OHL Catalogue</h1>
      <div className="app__home-innerDiv">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
          whileTap={{ rotate: 360, transition: { duration: 1 } }}
        >
          <Button
            size="large"
            variant="contained"
            endIcon={<PlayArrowIcon />}
            onClick={() => navigate("/catalogue", { replace: false })}
          >
            Start
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
