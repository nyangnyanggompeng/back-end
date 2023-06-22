// POST /chatgpt/:list_id
// chatGPT에게 메시지를 보낼 때
import models from '../../models/index.js';
import callChatGPT from '../../middleware/chatgpt.js';

const postContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const prompt = req.body.prompt;

    // 기존 메시지가 존재하지 않는다고 가정
    await models.ChatGPTContent.create({
      list_id: `${listId}`,
      sender: 'user',
      content: prompt
    });

    // 이후 middleware/chatgpt 실행
    const response = await callChatGPT(prompt);

    // 결과를 다시 ChatGPTContent에 저장
    await models.ChatGPTContent.create({
      list_id: `${listId}`,
      sender: 'assistant',
      content: response.content
    });

    // 결과를 API POST의 결과로 return
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export default postContent;
