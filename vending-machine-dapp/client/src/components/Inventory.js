import { Typography, Paper } from "@mui/material";

const Inventory = ({ inventory,text }) => {
  return (
    <Paper className="inventory-paper" elevation={3}>
      <Typography component="div" className="p5" color="primary">
        {text}
        <Typography className="pl5" component="span" color="secondary">
          {inventory}
        </Typography>
      </Typography>
    </Paper>
  );
};

export default Inventory;
