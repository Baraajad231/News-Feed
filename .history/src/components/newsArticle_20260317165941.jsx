import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
function NewsArticle() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://placeholder.co/150"
          alt="Sample article"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Sample Article (Title)
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This is a sample article (Description)
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          John Doe (Author)
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Tuesday October 3rd, 2023
        </Typography>
      </Box>
    </StyledCard>
  );
}

export default NewsArticle;
