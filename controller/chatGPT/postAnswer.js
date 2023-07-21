// POST /chatgpt/:list_id/:qestion_num
// 각각의 질문에 피드백 답변할 때
import models from '../../models/index.js';
import callChatGPT from '../../middleware/chatgpt.js';

const postAnswer = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const questionNum = Number(req.params.question_num);
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).send('ANSWER_NOT_ENTERED');
    }

    // question_num에 맞는 질문 가져오기
    const question = await models.ChatGPTContent.findAll({
      attributes: ['content'],
      where: {
        listId: listId,
        questionNum: questionNum
      }
    });

    const content =
      '질문은 다음과 같다: ' +
      `${question[0].dataValues.content}` +
      ' 답변은 다음과 같다: ' +
      `${answer}` +
      ' 답변에 피드백 해 줘';

    await models.ChatGPTContent.create({
      listId: `${listId}`,
      sender: 'user',
      content: answer,
      questionNum: questionNum
    });

    // 이후 middleware/chatgpt 실행
    const response = await callChatGPT(content);

    const Content = await models.ChatGPTContent.create({
      listId: `${listId}`,
      sender: 'assistant',
      content: response.content,
      questionNum: questionNum
    });

    return res.status(200).json(Content);
  } catch (err) {
    req.message = 'POST_ANSWER';
    next(err);
  }
};

export default postAnswer;
