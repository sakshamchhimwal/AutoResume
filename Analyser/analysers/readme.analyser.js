import { config } from "dotenv";
config();
import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;

async function analyseReadme(readmeContents) {
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

	const parts = [
		{ text: readmeContents },
		{
			text: `This is  a ReadMe.md for a repository. Analyse this well and provide two things. 
      1. The features of this projects.
      2. Prominent Technologies used in this project.
      
      Strictly use this Output Format
      \`\`\`json{
          skills: [X,Y,Z],
          features: [X,Y,Z]
      }\`\`\`
      
      Output Examples
      \`\`\`json{
          skills: [HTML,CSS,JS,ReactJs,NodeJs],
      features: ["Responsive web design", "Provides real time updates for X","Reduces the time for X by Y"]
      }\`\`\`
      
      **Do not come up with your own assumptions use only the data provided.**
      
      Strictly Limit the **Skills to 6** and **Feature to 10** in the ouptut.
      Do not repeat the features.
      If you are not able to identify 10 features do not make up on your own reduce the number of features.
      Try to include as many skills as possible. Limit the skills to Technical side only.`,
		},
	];
	const result = await model.generateContent({
		contents: [{ role: "user", parts }],
		generationConfig,
		safetySettings,
	});

	const response = result.response;
	// console.log("Readme Analysis",response.text());
	return response.text();
}

export default analyseReadme;
