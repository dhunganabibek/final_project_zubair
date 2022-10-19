import { ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

interface MultiActionAreaCardProps {
  image: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonAction: () => void;
}

export default function MultiActionAreaCard({
  image,
  title,
  description,
  buttonText,
  buttonAction,
}: MultiActionAreaCardProps): ReactElement {
  return (
    <Card sx={{ width: "400px", height: "500px", margin: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{
        display:'flex',
        justifyContent: 'center'
      }}>
        <Button size="large" color="primary" variant="contained" href='tickets'>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
