import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./fields.scss";

const Item = ({value, id}) => {
    const navigate = useNavigate()
  return (
    <>
      <motion.div
        className="app__fields-card"
        whileHover={{
          scale: 1.02,
          color: "darkviolet",
          backgroundColor: "moccasin",
          transition: { duration: 0.2 },
        }}
        onClick={() => navigate(`/catalogue/items/${id}`, {replace: false})}
      >
        <span style={{ color: "blue" }}>{value}</span>
      </motion.div>
    </>
  )
}

export default Item