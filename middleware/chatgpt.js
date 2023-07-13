import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();

const callChatGPT = async prompt => {
  try {
    const configiration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION
    });

    // openai에서 발급 받은 비밀키, 조직ID로 객체를 생성
    const openai = new OpenAIApi(configiration);
    console.log('openai');
    // 생성된 객체로 openAI의 여러가지 모델 중 하나인 gpt-3.5-turbo에 요청 전송
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    return res.data.choices[0].message;
  } catch (err) {
    console.error('callGpt35() error >>> ', err);
    return null;
  }
};

export default callChatGPT;
