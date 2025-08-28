import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

export const parseResume = async (req, res) => {
  try {
    const jobDesc = req.body.jobDesc;
    let pdfPath;

    if (req.file && req.file.path) {
      // uploaded via frontend
      pdfPath = req.file.path;
    } else {
      // fallback for tests
      pdfPath = path.join(
        process.cwd(),
        "test",
        "data",
        "05-versions-space.pdf"
      );
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // delete uploaded temp file if it came from multer
    if (req.file) fs.unlinkSync(pdfPath);

    res.json({ resumeText, jobDesc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to parse resume", error: error.message });
  }
};
