// POST /chatgpt/:list_id
// chatGPT에게 메시지를 보낼 때
import models from '../../models/index.js';
import callChatGPT from '../../middleware/chatgpt.js';

const postContent = async (req, res, next) => {
  try {
    const listId = Number(req.params.list_id);
    const { company, job, prompt, type, count } = req.body;
    let content;
    if (prompt) {
      content =
        '다음은 ' +
        `${company}` +
        ' ' +
        `${job}` +
        ' 지원 자소서야: ' +
        `${prompt}` +
        ' 이걸 보고 ' +
        `${type}` +
        '면접 질문 ' +
        `${count}` +
        '개 해 줘';
    } else {
      content =
        `${company}` +
        ' ' +
        `${job}` +
        ' ' +
        `${type}` +
        '면접 질문 ' +
        `${count}` +
        '개 해 줘';
    }
    console.log('content = ', content);
    // 기존 메시지가 존재하지 않는다고 가정
    await models.ChatGPTContent.create({
      list_id: `${listId}`,
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
          await models.ChatGPTContent.create({
            list_id: `${listId}`,
            sender: 'assistant',
            content: list[i],
            question_num: i + 1
          });
        }
      }
    } else {
      await models.ChatGPTContent.create({
        list_id: `${listId}`,
        sender: 'assistant',
        content: response.content
      });
    }

    // 결과를 API POST의 결과로 return
    res.json('ok');
  } catch (err) {
    console.log(err);
  }
};

export default postContent;
