import { motion } from "framer-motion";
import "./fields.scss";

const Field = ({ Icon, fieldName, value }) => {
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
      >
        <Icon />
        <span>{fieldName}</span>
        <span style={{ color: "blue" }}>{value}</span>
      </motion.div>
    </>
  );
};

export default Field;
