import Public from "./Public";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

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
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const content = (
    <Box>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <h3>fsd</h3>{" "}
      </Box>{" "}
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <h3>fsd</h3>{" "}
      </Box>{" "}
    </Box>
  );
  return content;
};

function Home(props) {
  let userLogged = props.isUserLoged;

  if (!userLogged) {
    return UserLoggedBody();
  } else {
    return Public2();
  }
}

export default Home;
