import Public from "./Public";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { HomeCard } from "../components/pages/widgets/HomeCards.";

const Public2 = () => {
  const content = (
    <div>
      {" "}
      <Public />
      <img alt="babybel" id="babybel" className="templateScreenshot" />
    </div>
  );

  return content;
};

const UserLoggedBody = () => {
  const user = useSelector((state) => state.user);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const content = (
    <Box>
      <p>Welcome, {user.fullName} &#9825;</p>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <h3>item 1</h3> <h3></h3>{" "}
      </Box>{" "}
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <HomeCard text={"New Template"} />
        <HomeCard text={"New Request"} />
      </Box>{" "}
    </Box>
  );
  return content;
};

function Home(props) {
  let userLogged = props.isUserLoged;

  if (userLogged) {
    return UserLoggedBody();
  } else {
    return Public2();
  }
}

export default Home;
