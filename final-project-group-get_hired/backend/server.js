import app from "./api/app.js";

// Defining the port number on which the server will listen
const port = 9000;

// Starting the server and listening on the specified port number
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});