import { Card, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./fields.scss";

const Field = ({ Icon, fieldName, value }) => {
  return (
    <>
      <motion.div
        whileHover={{
          color: "darkviolet",
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
      >
        <Card className="app__fields-card" variant="outlined">
          <Grid container spacing={5}>
            <Grid item xs={1}>
              <Icon />
            </Grid>
            <Grid item xs={4}>
              <Typography>{fieldName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "blue" }}>{value}</span>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </>
  );
};

export default Field;
