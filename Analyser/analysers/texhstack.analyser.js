// node --version # Should be >= 18
// npm install @google/generative-ai
import { config } from "dotenv";
config();
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function FileGetter(files) {
  const parts = [
    {
      text: `You are given a list of files in the format \n[\n{\n\t"path":<path to file>,\n\t"url":<url of the file>\n}\n]\n\n\nLIST OF FILES: ${files}\n\n\n\nYou donot need to access the wesite url provided.\n\nYour work is to select **5** files which can help to understand the following for a particular user\n- Coding Style\n- Tech Stack used in the project\n\n**STRICTlLY**: Use only the information provided do not come up with information of yout own. Do not try to visit the input URLs. 
	**USE double quotes for the keys and values in the output.**
	  \n\n\nOutput format\n\`\`\`json[\nfile1, file2, file3, file4, file5\n]\`\`\`\n \`\`\`json[\n  "src/App.tsx",\n  "src/components/GameCard.tsx",\n  "src/hooks/useGames.ts",\n  "src/services/api-client.ts",\n  "src/theme.ts"\n]\`\`\``,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log("Extracted Files", response.text());
  return response.text();
}

export async function AnalyseFiles(code) {
  // console.log("RecievedCode",code);
  const parts = [
    {
      text: `This is the code provided\n${code}\n\n\nAnalyse this code for coding style insights ans tech stack used.\n\nStrictly: Use only the provided code samples for analysis. Analyse each file. Do not come up with your own assumptions. Provide with **3** insights no less no more. Include all the prominent tech stack that is employed in the application.

			Strictly, the output must be in JSON format. Include the backticks.
			**USE single quotes for the keys and values in the output. Make sure to enclose all key value pair in quotes**

			\n\nOutput format\n
			\`\`\`json{
				"insights":[insight1, insight2, insight3],
				"techStack": [tech1, tech2, tech3, tech4, tech5]
			}\`\`\`\n
			Example Output\n
			\`\`\`json{
				"insights": ["The code follows the PEP8 coding conventions, such as using snake_case for variable and function names, and indentations for blocks of code.","The code uses the Flask microframework for creating the web application, which is known for its simplicity and ease of use.","The code uses the Flask-Login extension to manage user authentication and sessions."],"techStack": ["Python", "Flask", "Flask-Login", "SQLAlchemy", "Flask-Bcrypt", "dotenv"]
			}\`\`\``,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  // console.log(parts);

  const response = result.response;
  // console.log("Tech Stack Found",response.text());
  return response.text();
}
