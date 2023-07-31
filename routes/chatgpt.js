import express from 'express';
const router = express.Router();

import getList from '../controller/chatGPT/getList.js';
import postList from '../controller/chatGPT/postList.js';
import getContent from '../controller/chatGPT/getContent.js';
import postContent from '../controller/chatGPT/postContent.js';
import postAnswer from '../controller/chatGPT/postAnswer.js';
import updateList from '../controller/chatGPT/updateList.js';
import deleteList from '../controller/chatGPT/deleteList.js';
import deleteContent from '../controller/chatGPT/deleteContent.js';
import searchList from '../controller/chatGPT/searchList.js';
import searchContent from '../controller/chatGPT/searchContent.js';

import auth from '../middleware/auth.js';

router.get('/', (req, res) => {
  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함
});

/**
 * @swagger
 * /chatgpt/lists/{page_num}:
 *   get:
 *     summary: 해당 유저의 인터뷰룸 목록 조회
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 인터뷰룸 목록 전송 성공
 *         content:
 *            application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/ChatGPT'
 *             example:
 *               List:
 *                 - id: 2
 *                   name: 대화목록2
 *                   type:
 *                   createdAt: 2023-07-07T15:50:44.000Z
 *                 - id: 6
 *                   name: 대화목록7
 *                   type:
 *                   createdAt: 2023-07-07T15:50:35.000Z
 *               numberOfPost: 2
 *               totalPages: 1
 *       500:
 *         description: 인터뷰룸 목록 전송 실패
 *         content:
 *            text/html:
 *              example: GET_LIST_FAILURE
 * components:
 *   schemas:
 *     ChatGPT:
 *       List:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *                type: integer
 *             name:
 *                type: string
 *             type:
 *                type: string
 *             createdAt:
 *                type: string
 *                format: date-time
 *       numberOfList:
 *         type: integer
 *       totalPages:
 *         type: integer
 */
router.get('/lists/:page_num', auth, getList);

/**
 * @swagger
 * /chatgpt/lists:
 *   post:
 *     summary: 인터뷰룸 목록 생성
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: body
 *         name: listNameInfo
 *         description: 인터뷰룸 목록 이름
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *           example:
 *             name: 대화목록1
 *     responses:
 *       200:
 *         description: 인터뷰룸 목록 생성 성공
 *         content:
 *            application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/ChatGPTList'
 *             example:
 *               - id: 1
 *                 type:
 *                 name: 대화목록1
 *                 createdAt: 2023-07-07T15:50:44.000Z
 *       400:
 *         description: 필수 값 누락, 이름이 중복인 경우, 최대 인터뷰룸 개수를 초과했을 시
 *         content:
 *            text/html:
 *              example: LIST_NAME_NO_ENTERED
 *                     / LIST_NAME_ALREADY_EXISTS
 *                     / UNABLE_TO_CREATE_LIST_ANYMORE
 *       500:
 *         description: 인터뷰룸 목록 생성 실패
 *         content:
 *            text/html:
 *              example: POST_LIST_FAILURE
 * components:
 *   schemas:
 *     ChatGPTList:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         type:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
router.post('/lists', auth, postList);

/**
 * @swagger
 * /chatgpt/lists:
 *   patch:
 *     tags: [ChatGPT]
 *     summary: 선택한 인터뷰룸의 이름 수정
 *     description: 선택한 인터뷰룸의 이름 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 수정할 인터뷰룸 이름
 *             example:
 *               name: 수정한 대화목록1
 *     responses:
 *       200:
 *         description: 선택한 인터뷰룸의 이름 수정 성공
 *         content:
 *            text/html:
 *              example: UPDATE_LIST_SUCCESS
 *       400:
 *         description: 입력 값 누락
 *         content:
 *            text/html:
 *              example: NAME_NO_ENTERED
 *       500:
 *         description: 선택한 인터뷰룸의 이름 수정 실패
 *         content:
 *            text/html:
 *              example: UPDATE_LIST_FAILURE
 */
router.patch('/lists/:list_id', auth, updateList);

/**
 * @swagger
 * /chatgpt/lists:
 *   put:
 *     tags: [ChatGPT]
 *     summary: 인터뷰룸 목록 삭제
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listIdList:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               listIdList: [3, 4, 5]
 *     responses:
 *       200:
 *         description: 인터뷰룸 목록 삭제 성공
 *         content:
 *            text/html:
 *              example: DELETE_LIST_SUCCESS
 *       400:
 *         description: 필수 값 누락, 해당 인터뷰룸 목록이 없을 때
 *         content:
 *            text/html:
 *              example: EMPTY_LIST_ID_LIST
 *                     / LIST_DOESNT_EXIT
 *       401:
 *         description: 해당 목록을 작성한 유저 또는 Admin이 아닌 경우
 *         content:
 *            text/html:
 *              example: NO_PERMISSIONS
 *       500:
 *         description: 인터뷰룸 목록 삭제 실패
 *         content:
 *            text/html:
 *              example: DELETE_LIST_FAILURE
 */
router.put('/lists', auth, deleteList);

/**
 * @swagger
 * /chatgpt/contents/{list_id}:
 *   get:
 *     summary: 해당 인터뷰룸의 전체 내용 조회
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         description: 해당 인터뷰룸의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 인터뷰룸 전체 내용 전송 성공
 *         content:
 *            application/json:
 *              schema:
 *                items:
 *                   $ref: '#/components/schemas/ChatGPTContent'
 *              example:
 *                - prompt: KT의 SW 개발자로서 중요한 역량 첫 번째는 IT 기술의 발전에 따라 배우고자 하는 자세입니다. KT SW 개발자로 합격이 된다면 열심히 하겠습니다.
 *                  type: 인성
 *                  count: 1
 *                  value:
 *                     - id: 108
 *                       questionNum: 1
 *                       sender: assistant
 *                       content: 당신이 IT 기술의 발전에 따라 계속해서 배우고자 하는 자세를 가지고 있는 이유는 무엇인가요?
 *                       bookmark: false
 *                       createdAt: 2023-07-17T03:21:32.000Z
 *                       updatedAt: 2023-07-17T03:21:32.000Z
 *                       deletedAt: null
 *                       listId: 42
 *       400:
 *         description: 인터뷰룸 목록이 없는 경우
 *         content:
 *            text/html:
 *              example: WRONG_CHATGPT_LIST
 *       500:
 *         description: 인터뷰룸 전체 내용 전송 실패
 *         content:
 *            text/html:
 *              example: GET_CONTENT_FAILURE
 * components:
 *   schemas:
 *     ChatGPTContent:
 *       type: object
 *       properties:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             prompt:
 *               type: string
 *             type:
 *               type: string
 *             count:
 *               type: integer
 *             items:
 *               type: object
 *               properties:
 *                  id:
 *                    type: integer
 *                  questionNum:
 *                    type: string
 *                  sender:
 *                    type: string
 *                  content:
 *                    type: string
 *                  bookmark:
 *                    type: boolean
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 *                  deletedAt:
 *                    type: string
 *                    format: date-time
 *                  listId:
 *                    type: integer
 */
router.get('/contents/:list_id', auth, getContent);

/**
 * @swagger
 * /chatgpt/contents/{list_id}:
 *   post:
 *     summary: 인터뷰룸에서 대화 전송
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         description: 해당 인터뷰룸 ID
 *         schema:
 *           type: integer
 *       - in: body
 *         name: contentInfo
 *         description: 인터뷰룸 질문 내용
 *         schema:
 *           type: object
 *           required:
 *             - prompt
 *             - type
 *             - count
 *           properties:
 *             prompt:
 *               type: string
 *             type:
 *               type: string
 *             count:
 *               type: integer
 *           example:
 *             prompt: KT의 SW 개발자로서 중요한 역량 첫 번째는 IT 기술의 발전에 따라 배우고자 하는 자세입니다. KT SW 개발자로 합격이 된다면 열심히 하겠습니다.
 *             type: 인성
 *             count: 3
 *     responses:
 *       200:
 *         description: 대화 내용 전송 성공
 *         content:
 *            application/json:
 *              schema:
 *                items:
 *                   $ref: '#/components/schemas/ChatGPTContent'
 *              example:
 *                - prompt: KT의 SW 개발자로서 중요한 역량 첫 번째는 IT 기술의 발전에 따라 배우고자 하는 자세입니다. KT SW 개발자로 합격이 된다면 열심히 하겠습니다.
 *                  type: 인성
 *                  count: 1
 *                  value:
 *                     - id: 108
 *                       questionNum: 1
 *                       sender: assistant
 *                       content: 당신이 IT 기술의 발전에 따라 계속해서 배우고자 하는 자세를 가지고 있는 이유는 무엇인가요?
 *                       bookmark: false
 *                       createdAt: 2023-07-17T03:21:32.000Z
 *                       updatedAt: 2023-07-17T03:21:32.000Z
 *                       deletedAt: null
 *                       listId: 42
 *       400:
 *         description: 필수 값 누락, 입력한 질문 개수가 10개 이상인 경우, 인터뷰룸 목록이 없는 경우
 *         content:
 *            text/html:
 *              example: PROMPT_OR_TYPE_OR_COUNT_NO_ENTERED
 *                     / TOO_MANY_QUESTIONS
 *                     / WRONG_CHATGPT_LIST
 *       500:
 *         description: 대화 전송 실패
 *         content:
 *            text/html:
 *              example: POST_CONTENT_FAILURE
 */
router.post('/contents/:list_id', auth, postContent);

/**
 * @swagger
 * /chatgpt/contents/{list_id}/{question_num}:
 *   post:
 *     tags: [ChatGPT]
 *     summary: 각 질문에 대한 답변 등록 및 피드백 전송
 *     description: 각 질문에 대한 답변 등록 및 피드백 전송
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         description: 인터뷰룸 대화 목록 ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: question_num
 *         required: true
 *         description: 해당 질문 ID
 *         schema:
 *           type: integer
 *       - in: body
 *         name: answerInfo
 *         description: 질문에 대한 답변
 *         schema:
 *           type: object
 *           required:
 *             - answer
 *           properties:
 *             answer:
 *               type: string
 *               description: 답변
 *           example:
 *             answer: 협업이란 동료와 함께 일을 하는 것을 뜻합니다.
 *     responses:
 *       200:
 *         description: 답변 등록 및 피드백 전송 성공
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                bookmark:
 *                   type: boolean
 *                id:
 *                   type: integer
 *                listId:
 *                   type: integer
 *                sender:
 *                   type: string
 *                content:
 *                   type: string
 *                questionNum:
 *                   type: integer
 *                createdAt:
 *                   type: string
 *                updatedAt:
 *                   type: string
 *                deletedAt:
 *                   type: string
 *             example:
 *               value:
 *                  - bookmark: false
 *                    id: 108
 *                    listId: 2
 *                    sender: assistant
 *                    content: 당신이 IT 기술의 발전에 따라 계속해서 배우고자 하는 자세를 가지고 있는 이유는 무엇인가요?
 *                    questionNum: 1
 *                    createdAt: 2023-07-17T03:21:32.000Z
 *                    updatedAt: 2023-07-17T03:21:32.000Z
 *                    deletedAt: null
 *       500:
 *         description: 답변 등록 및 피드백 전송 실패
 *         content:
 *            text/html:
 *              example: POST_ANSWER_FAILURE
 *       400:
 *         description: 필수 값 누락
 *         content:
 *            text/html:
 *              example: ANSWER_NOT_ENTERED
 */
router.post('/contents/:list_id/:question_num', auth, postAnswer);

/**
 * @swagger
 * /chatgpt/lists/{list_id}/contents:
 *   put:
 *     tags: [ChatGPT]
 *     summary: 인터뷰룸 대화 삭제
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         description: 인터뷰룸 대화 목록 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listIdList:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               listIdList: [3, 4, 5]
 *     responses:
 *       200:
 *         description: 인터뷰룸 대화 삭제 성공
 *         content:
 *            text/html:
 *              example: DELETE_CONTENT_SUCCESS
 *       400:
 *         description: 필수 값 누락, 첫 번째 대화(자기소개서, 질문 개수, 면접 유형이 포함된 메시지)를 삭제 시, 해당 대화 내용이 없을 때, 인터뷰룸 ID가 일치하지 않는 경우
 *         content:
 *            text/html:
 *              example: POST_DOESNT_EXIST
 *                     / UNABLE_TO_DELETE_CONTENT
 *                     / EMPTY_CONTENT_ID_LIST
 *                     / LIST_ID_DOSENT_MATCH
 *       401:
 *         description: 해당 대화을 작성한 유저 또는 Admin이 아닌 경우
 *         content:
 *            text/html:
 *              example: NO_PERMISSIONS
 *       500:
 *         description: 인터뷰룸 대화 삭제 실패
 *         content:
 *            text/html:
 *              example: DELETE_CONTENT_FAILURE
 */
router.put('/lists/:list_id/contents', auth, deleteContent);

/**
 * @swagger
 * /chatgpt/search/lists/{page_num}:
 *   post:
 *     summary: 인터뷰룸 목록 검색
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *       - in: body
 *         name: searchListInfo
 *         description: 검색할 내용
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *           example:
 *             name: 대화
 *     responses:
 *       200:
 *         description: 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Search'
 *             examples:
 *               example1:
 *                   summary: 검색 결과가 있는 경우
 *                   value:
 *                     Result:
 *                       - id: 14
 *                         name: 대화목록14
 *                         type:
 *                         createdAt: 2023-07-08T16:36:39.000Z
 *                       - id: 15
 *                         name: 대화목록15
 *                         type:
 *                         createdAt: 2023-07-08T16:36:43.000Z
 *                       - id: 16
 *                         name: 대화목록16
 *                         type:
 *                         createdAt: 2023-07-08T16:36:47.000Z
 *                     numberOfPost: 3
 *                     totalPages: 1
 *               example2:
 *                   summary: 검색 결과가 없는 경우
 *                   value:
 *                     Result: []
 *                     numberOfPost: 0
 *                     totalPages: 0
 *       400:
 *         description: 필수 값 누락
 *         content:
 *            text/html:
 *              example: NAME_NOT_ENTERED
 *       500:
 *         description: 검색 실패
 *         content:
 *            text/html:
 *              example: GET_MY_COMMENT_FAILURE
 *
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         Result:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *               name:
 *                  type: string
 *               type:
 *                  type: string
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *         numberOfPost:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.post('/search/lists/:page_num', auth, searchList);

/**
 * @swagger
 * /chatgpt/search/contents/{page_num}:
 *   post:
 *     summary: 인터뷰룸 대화 내용 검색
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: path
 *         name: page_num
 *         required: true
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *       - in: body
 *         name: searchContentInfo
 *         description: 검색할 내용
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *           example:
 *             content: 계획
 *     responses:
 *       200:
 *         description: 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/Search'
 *             examples:
 *               example1:
 *                   summary: 검색 결과가 있는 경우
 *                   value:
 *                     Result:
 *                       - id: 1
 *                         questionNum: 0
 *                         sender: user
 *                         content: 다음은 자기소개서야:KT의 SW 개발자로서 중요한 역량 첫 번째는 IT 기술의 발전에 따라 배우고자 하는 자세입니다. 학부생 때부터 다양한 IT 기술을 배우는 자세가 중요하다고 생각하였습니다. 이 때문에 전공 수업뿐만이 아니라 스터디 활동을 통하여 네트워크, 블록체인, IoT 등의 다양한 IT 지식을 습득하였습니다. 결국 폭넓은 이해를 도울 수 있었고 해당 산업에 대한 이해를 도울 수 있었습니다. 다른 어떠한 분야보다도 빠르게 변화하는 IT분야에서 몇 년 전 5G는 먼 미래의 이야기였지만, 현재는 다음 단계를 준비하고 있는 것처럼 지속해서 변화하는 기술을 배우고 활용하는 자세가 중요시될 것입니다. 입사 후에도 이러한 자세로 지속해서 새로운 기술을 빠르게 습득하고 활용하여 KT의 기술 변화를 주도하도록 하겠습니다. 두 번째는 원활한 팀 프로젝트를 위한 소통 능력입니다. 질소산화물 조작 방지 시스템을 개발하는 프로젝트에서 여러 블록체인 모델 중 하나만 선택하여 사용하려고 하였으나, 팀원의 아이디어로 두 가지 모델을 합친 형태로 진행하여 각각의 장점을 더욱 살려 효율적으로 만들어 낼 수 있었습니다. 팀원 간 효과적인 의사소통으로 얻어낸 결과물로 의사소통의 중요성을 체험할 수 있었습니다. 또, 다른 경험으로는 와인 판매 사이트를 개설하는 프로젝트에서 백엔드로 API를 만들 때 이것을 사용하게 될 프론트엔드와의 소통으로 API 문서를 만들어 이해관계를 높인 결과를 낸 적이 있습니다. 이처럼 하나의 서비스나 SW를 개발하려면 개인의 실력이 뛰어나다고 해도 혼자서 해낼 수 없기 때문에 의사소통 능력은 필수적인 요소라고 생각합니다. 이걸 읽고 인성면접 질문 4개 해 줘
 *                         bookmark: false
 *                         createdAt: 2023-07-11T14:39:33.000Z
 *                         listId: 10
 *                         ChatGPTList:
 *                             - name: 대화목록1
 *                       - id: 2
 *                         questionNum: 1
 *                         sender: assistant
 *                         content: IT 기술의 발전에 따라 계속해서 새로운 기술을 배우고 적용하는 자세를 유지하기 위해 어떤 노력을 하셨나요?
 *                         bookmark: false
 *                         createdAt: 2023-07-11T14:40:02.000Z
 *                         listId: 10
 *                         ChatGPTList:
 *                             - name: 대화목록1
 *                     numberOfPost: 2
 *                     totalPages: 1
 *               example2:
 *                   summary: 검색 결과가 없는 경우
 *                   value:
 *                     Result: []
 *                     numberOfPost: 0
 *                     totalPages: 0
 *       400:
 *         description: 필수 값 누락
 *         content:
 *            text/html:
 *              example: CONTENT_NOT_ENTERED
 *       500:
 *         description: 검색 실패
 *         content:
 *            text/html:
 *              example: GET_MY_COMMENT_FAILURE
 *
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         Result:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *               questionNum:
 *                  type: integer
 *               sender:
 *                  type: string
 *               content:
 *                  type: string
 *               bookmark:
 *                  type: boolean
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *               listId:
 *                  type: integer
 *               items:
 *                  type: object
 *                  properties:
 *                    name: string
 *         numberOfPost:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
router.post('/search/contents/:page_num', auth, searchContent);

export default router;
