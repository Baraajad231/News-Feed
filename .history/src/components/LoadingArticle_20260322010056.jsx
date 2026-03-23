import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledCard } from "./StyledCard";
import { Skeleton } from "@mui/material";

const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        <CardContent>
          <Skeleton variant="text" sx={{"font-size: 5rem"}}></Skeleton>
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
