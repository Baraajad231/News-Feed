import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        (
        <CardMedia component="img" height="200" alt="Sample article" />)
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
