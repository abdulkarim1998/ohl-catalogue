import "./home.scss";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import { Typography, Card } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="app__home">
      <Typography variant="h4" className="app__home-welcome">
        Welcome To OHL Catalogue
      </Typography>
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
