import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConex() {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  conn.isConnected = db.connections[0].readyState;
}
connection.on("connected", () => {
  console.log("Connected");
});

connection.on("error", (err) => {
  console.log("error es: " + err);
});
