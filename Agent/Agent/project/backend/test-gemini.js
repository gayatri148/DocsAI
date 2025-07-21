require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.0-pro' }); // Try this model name
  const result = await model.generateContent('Say hello');
  console.log(result.response.text());
}

testGemini();
