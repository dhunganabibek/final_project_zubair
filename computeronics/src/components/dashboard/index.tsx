import Card from "./Card";
import Box from "@mui/material/Box";
import Windows1 from "../../images/windows1.jpeg";
import Windows2 from "../../images/windows2.jpeg";
const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 10,
};
const Dashboard = () => {
  return (
    <Box sx={styles}>
      <Card
        image={Windows1}
        title="Raise Ticket"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica"
        buttonText="Raise Ticket"
        buttonAction={() => {}}
      />
      <Card
        image={Windows2}
        title="Order Accessories"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica"
        buttonText="Order Accessories"
        buttonAction={() => {}}
      />
    </Box>
  );
};

export default Dashboard;
