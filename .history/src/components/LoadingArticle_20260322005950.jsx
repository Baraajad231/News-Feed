import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledCard } from "./StyledCard";

const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div"></Typography>
          <Typography variant="body2" color="textSecondary"></Typography>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
        ></Typography>
        (<Typography variant="caption" color="textSecondary"></Typography>)
      </Box>
    </StyledCard>
  );
};

export default LoadingArticle;
