import { spawn } from "child_process";

export const checkPhishing = async (request, response) => {
  let phishingPrediction;
  // Load phishing-detection script
  const pythonProcess = spawn("python", [
    "./scripts/phishing_detection.py",
    request.body.text,
  ]);

  if (request.body.text.includes(".")) {
    pythonProcess.stdout.on("data", (data) => {
      const result = data.toString().trim(); // Trim any leading or trailing whitespace
      phishingPrediction = result.substring(2, result.length - 2); // Extract the word between '[' and ']'
      response.send(phishingPrediction === "bad");

      // console.log("Phishing Detection prediction:", phishingPrediction);
    });
  }

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("error", (error) => {
    console.error(`Error executing Python script: ${error}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`, {
      phishingPrediction,
    });
    const prediction = phishingPrediction === "bad";
    response.send(prediction);
    return phishingPrediction === "bad";
  });
};
