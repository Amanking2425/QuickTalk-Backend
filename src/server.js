// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route.js"; 
// import { connectDB } from "./lib/db.js";
// dotenv.config(); // Load environment variables from .env file
// import userRoutes from "./routes/user.route.js";
// import chatRoutes from "./routes/chat.route.js";
// import cors from "cors";
// import path from "path";

 
// const app = express();
// const PORT = process.env.PORT
// const __dirname = path.resolve(); // Get the current directory name

// app.use(cors({
//     origin : "http://localhost:5173", // Allow requests from this originq
//     credentials: true, // Allow cookies to be sent with requests
// }))
// app.use(express.json()); // Middleware to parse JSON bodies
// app.use(cookieParser()); // Middleware to parse cookies
// app.use("/api/auth" , authRoutes); // Define a route for authentication
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);

// if(process.env.NODE_ENV === "production") {
//     // Serve static files from the React app
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     // Handle any requests that don't match the above routes
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//     });
// }

// app.listen(PORT, () =>{
//     console.log(`Server is running on port 5001 ${PORT}`);
//     connectDB();
// })




import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"; 
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// ✅ ✅ ✅ ESSENTIAL CHANGE #1 (ALLOW VERCEL FRONTEND)
app.use(cors({
  //origin: "http://localhost:5173",   // ✅ allow your frontend
 origin: [
    "http://localhost:5173", 
    "https://quick-talk-frontend.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB();

// ✅ ✅ ✅ ESSENTIAL CHANGE #2 (REMOVE app.listen FOR VERCEL)
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        
    });
}

// ✅ ✅ ✅ ESSENTIAL CHANGE #3 (EXPORT APP FOR VERCEL)
export default app;
