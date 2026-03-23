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
          <Skeleton
            variant="text"
            height={200}
            sx={{ fontSize: " 12.5rem" }}
          ></Skeleton>
          <Skeleton variant="text" sx={{ fontSize: " 1.5rem" }}></Skeleton>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: " 1.5rem" }}
        ></Skeleton>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: " 1.5rem" }}
        ></Skeleton>
      </Box>
    </StyledCard>
  );
};

export default LoadingArticle;
