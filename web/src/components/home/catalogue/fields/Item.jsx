import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./fields.scss";

const Item = ({ value, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        onClick={() => navigate(`/catalogue/items/${id}`, { replace: false })}
      >
        <Card className="app__fields-card" variant="outlined">
          <Typography>{value}</Typography>
        </Card>
      </motion.div>
    </>
  );
};

export default Item;
