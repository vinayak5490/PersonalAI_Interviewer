import { Server } from "socket.io";
import http from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("startInterview", async ({ resumeText, jobDesc }) => {
    const prompt = `You are an AI interview coach. Given the following resume and job description, simulate an interview by asking relevant questions.
      Resume: ${resumeText}
      Job Description: ${jobDesc}
      Ask one question at a time.
      Adjust the difficulty level and questions based on the answer of the candidate.
      Keep in mind the interview should exactly similar to the real interview.`;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const question = response.text();
    socket.emit("aiQuestion", { question });
  });

  socket.on(
    "userAnswer",
    async ({ answer, conversation, jobDesc, resumeText }) => {
      const prompt = `
      You are an AI interviewer. Here is the conversation so far:
      ${conversation.map((c, i) => `${c.role}: ${c.text}`).join("\n")}
      Candidate's last answer: ${answer}
      Resume: ${resumeText}
      Job Description: ${jobDesc}
      Ask the next question.
    `;
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const question = response.text();
      socket.emit("aiQuestion", { question });
    }
  );
});

server.listen(4000, () => console.log("WebSocket server running on port 4000"));
