// POST /chatgpt/:list_id/:qestion_num
// 각각의 질문에 피드백 답변할 때
import models from '../../models/index.js';
import callChatGPT from '../../middleware/chatgpt.js';

const postAnswer = async (req, res, next) => {
  try {
    const { list_id, question_num } = req.params;
    const listId = Number(list_id);
    const questionNum = Number(question_num);
    const answer = req.body.answer;
    console.log('listId = ', listId, ' / questionNum = ', questionNum);

    // question_num에 맞는 질문 가져오기
    const question = await models.ChatGPTContent.findAll({
      attributes: ['content'],
      where: {
        list_id: listId,
        question_num: questionNum
      }
    });

    console.log('question = ', question[0].dataValues.content);

    const content =
      '질문은 다음과 같다: ' +
      `${question[0].dataValues.content}` +
      ' 답변은 다음과 같다: ' +
      `${answer}` +
      ' 답변에 피드백 해 줘';

    console.log('content = ', content);

    await models.ChatGPTContent.create({
      list_id: `${listId}`,
      sender: 'user',
      content: content,
      question_num: questionNum
    });

    // 이후 middleware/chatgpt 실행
    const response = await callChatGPT(content);

    const Content = await models.ChatGPTContent.create({
      list_id: `${listId}`,
      sender: 'assistant',
      content: response.content,
      question_num: questionNum
    });

    if (Content) {
      res.status(200).json(Content);
    } else {
      res.status(400).send('400 Bad Request');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('400 Bad Request');
  }
};

export default postAnswer;
