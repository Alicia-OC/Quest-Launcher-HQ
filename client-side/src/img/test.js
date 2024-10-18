export const test = () => {
  return (
    <>
      {" "}
      <Box
        p="1rem 6%"
        textAlign="center"
        width={isNonMobileScreens ? "70%" : "100%"}
        m="2rem auto"
        borderRadius="3rem"
      >
        <div className="creationForm-form">
          <form method="post" name="newUserForm">
            <h2>Registration</h2>
            <p>
              Please use a google generated password, this website uses
              encryption and a bunch of salt rounds, but mind that I'm just a
              lovely junior to work with, doing her first ever app :D
            </p>
          </form>
        </div>
        <div className="creationForm-image">
          <img className="registrationImage" src={cat}></img>
        </div>{" "}
      </Box>
    </>
  );
};
