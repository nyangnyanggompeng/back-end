// POST /chatgpt/:list_id
// chatGPT에게 메시지를 보낼 때
import models from '../../models/index.js';
import callChatGPT from '../../middleware/chatgpt.js';
// import { resourceLimits } from 'worker_threads';

const postContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const { prompt, type, count } = req.body;
    let content, ChatGPTContent;

    const List = await models.ChatGPTList.findAll({
      where: { id: listId }
    });

    if (List.length === 0) {
      return res.status(400).send('WRONG_CHATGPT_LIST');
    } else if (!prompt || !type || !count) {
      return res.status(400).send('PROMPT_OR_TYPE_OR_COUNT_NOT_ENTERED');
    } else if (count > 10) {
      return res.status(400).send('TOO_MANY_QUESTIONS');
    } else {
      if (prompt) {
        content =
          '다음은 자기소개서야:' +
          `${prompt}` +
          ' 이걸 읽고 ' +
          `${type}` +
          '면접 질문 ' +
          `${count}` +
          '개 해 줘';
      } else {
        content = `${type}` + '면접 질문 ' + `${count}` + '개 해 줘';
      }

      // 기존 메시지가 존재하지 않는다고 가정
      await models.ChatGPTContent.create({
        listId: `${listId}`,
        sender: 'user',
        content: content
      });

      // 이후 middleware/chatgpt 실행
      const response = await callChatGPT(content);

      // if ( response에 /n이 포함되어 있으면 ) -> 분리해서 넣기
      if (response.content.includes('\n')) {
        const list = response.content.split('\n');
        for (let i = 0; i < list.length; i++) {
          if (!isNaN(list[i][0])) {
            const quesiton = list[i].slice(3);
            const number = Number(list[i][0]);
            ChatGPTContent = await models.ChatGPTContent.create({
              listId: `${listId}`,
              sender: 'assistant',
              content: quesiton,
              questionNum: number
            });
          }
        }
      } else if (count === '1') {
        ChatGPTContent = await models.ChatGPTContent.create({
          listId: `${listId}`,
          sender: 'assistant',
          content: response.content,
          questionNum: 1
        });
      } else {
        ChatGPTContent = await models.ChatGPTContent.create({
          listId: `${listId}`,
          sender: 'assistant',
          content: response.content
        });
      }

      await models.ChatGPTList.update(
        {
          type: type
        },
        { where: { id: listId } }
      );
      ChatGPTContent = await models.ChatGPTContent.findAll({
        where: { listId: listId, sender: 'assistant' }
      });

      return res.status(200).json([{ prompt, type, count }, ChatGPTContent]);
    }
  } catch (err) {
    req.message = 'POST_CONTENT';
    next(err);
  }
};

export default postContent;
