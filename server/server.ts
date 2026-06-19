import app from "./src/app.js";    




const PORT = Number(process.env.PORT) || 5000;




//Strat the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});