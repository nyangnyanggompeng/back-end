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
    if (count > 10) {
      res.status(400).send('질문의 개수가 너무 많습니다.');
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
      console.log('content = ', content);
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
        console.log('list : ', list);
        for (let i = 0; i < list.length; i++) {
          if (list[i]) {
            console.log('list[i][0] = ', list[i][0]); // 숫자나옴
            ChatGPTContent = await models.ChatGPTContent.create({
              listId: `${listId}`,
              sender: 'assistant',
              content: list[i],
              questionNum: i + 1
            });
          }
        }
      } else {
        ChatGPTContent = await models.ChatGPTContent.create({
          listId: `${listId}`,
          sender: 'assistant',
          content: response.content
        });
      }

      // 결과를 API POST의 결과로 return
      if (ChatGPTContent) {
        await models.ChatGPTList.update(
          {
            type: type
          },
          { where: { id: listId } }
        );
        ChatGPTContent = await models.ChatGPTContent.findAll({
          where: { listId: listId, sender: 'assistant' }
        });
        res.status(200).json(ChatGPTContent);
      } else {
        res.status(400).send('400 Bad Request');
      }
    }
  } catch (err) {
    next(err);
  }
};

export default postContent;
