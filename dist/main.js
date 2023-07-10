/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var _routes_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/index.js */ \"./routes/index.js\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/index.js */ \"./models/index.js\");\n\r\n\r\n\r\n\r\n// import cookieParser from \"cookie-parser\";\r\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_1__.config();\r\n\r\nconst domains = ['http://localhost:5173'];\r\n// const domains = ['*'];\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\r\napp.set('view engine', 'ejs'); // view 엔진을 ejs를 쓰겠다는 설정\r\n\r\n_models_index_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sequelize\r\n  .sync({ force: false }) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드\r\n  // force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정\r\n  .then(() => {\r\n    console.log('데이터 베이스 연결 성공');\r\n  })\r\n  .catch(err => {\r\n    console.log(err);\r\n  });\r\n\r\napp.use(morgan__WEBPACK_IMPORTED_MODULE_3__('dev'));\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0__.json());\r\napp.use(\r\n  express__WEBPACK_IMPORTED_MODULE_0__.urlencoded({\r\n    extended: false\r\n  })\r\n);\r\n\r\n// app.use(cookieParser(process.env.SECERET_COOKIE))\r\n// app.use(cors({ credentials: true, origin: '*' }));\r\n\r\nconst corsOptions = {\r\n  origin: function (origin, callback) {\r\n    const isTrue = domains.indexOf(origin) !== -1;\r\n    callback(null, isTrue);\r\n  },\r\n  credentials: true\r\n};\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_2__(corsOptions));\r\n\r\napp.use(\r\n  '/api',\r\n  (req, res, next) => {\r\n    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');\r\n    next();\r\n  },\r\n  _routes_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\r\n);\r\n\r\napp.use((req, res, next) => {\r\n  const err = new Error(`${req.method} ${req.url} 찾을 수 없음`);\r\n  err.status = 404;\r\n  next(err);\r\n});\r\n\r\napp.use((err, req, res, next) => {\r\n  res.status(err.status || 500);\r\n  res.send(`[Error] ${err}`);\r\n  // res.send(`${err.status} Error`);\r\n});\r\n\r\napp.listen(process.env.PORT || 3000, () => {\r\n  console.log(`${process.env.PORT}번 포트로 연결되었습니다.`);\r\n});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./app.js?");

/***/ }),

/***/ "./controller/board/deleteComment.js":
/*!*******************************************!*\
  !*** ./controller/board/deleteComment.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// PUT /board/:post_id/comment/:comment_id\r\n// 댓글 삭제\r\n\r\n\r\nconst deleteComment = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n    const commentId = Number(req.params.comment_id);\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findOne({\r\n      where: { id: postId }\r\n    });\r\n    const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.destroy({ where: { id: commentId } });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Comment) {\r\n      const num = Post.numOfComment - 1;\r\n      await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.update(\r\n        {\r\n          numOfComment: num\r\n        },\r\n        { where: { id: postId } }\r\n      );\r\n      res.status(200).json(Comment);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteComment);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/deleteComment.js?");

/***/ }),

/***/ "./controller/board/deleteMycomments.js":
/*!**********************************************!*\
  !*** ./controller/board/deleteMycomments.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// PUT /board/posts\r\n// 선택 댓글 삭제\r\n\r\n\r\nconst deleteMycomments = async (req, res, next) => {\r\n  try {\r\n    const commentIdList = req.body.comment_id_list;\r\n\r\n    for (let i = 0; i < commentIdList.length; i++) {\r\n      const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.findOne({\r\n        attributes: ['postId'],\r\n        where: { id: commentIdList[i] }\r\n      });\r\n\r\n      const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findOne({\r\n        where: { id: Comment.postId }\r\n      });\r\n      const deleteComment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.destroy({\r\n        where: { id: commentIdList[i] }\r\n      });\r\n\r\n      if (deleteComment) {\r\n        const num = Post.numOfComment - 1;\r\n        await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.update(\r\n          {\r\n            numOfComment: num\r\n          },\r\n          { where: { id: Comment.postId } }\r\n        );\r\n      } else {\r\n        res.status(400).send('400 Bad Request');\r\n      }\r\n    }\r\n\r\n    res.status(200).send('200 OK');\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteMycomments);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/deleteMycomments.js?");

/***/ }),

/***/ "./controller/board/deleteMyposts.js":
/*!*******************************************!*\
  !*** ./controller/board/deleteMyposts.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board\r\n// 글 삭제\r\n\r\n\r\nconst deleteMyposts = async (req, res, next) => {\r\n  try {\r\n    const postIdList = req.body.post_id_list;\r\n\r\n    for (let i = 0; i < postIdList.length; i++) {\r\n      const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.destroy({ where: { id: postIdList[i] } });\r\n      if (!Post) {\r\n        res.status(400).send('400 Bad Request');\r\n      }\r\n    }\r\n\r\n    res.status(200).send('200 OK');\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteMyposts);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/deleteMyposts.js?");

/***/ }),

/***/ "./controller/board/deletePost.js":
/*!****************************************!*\
  !*** ./controller/board/deletePost.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board/:post_id\r\n// 글 삭제\r\n\r\n\r\nconst deletePost = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.destroy({ where: { id: postId } });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).send('200 OK');\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deletePost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/deletePost.js?");

/***/ }),

/***/ "./controller/board/getComment.js":
/*!****************************************!*\
  !*** ./controller/board/getComment.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /board/:post_id/comment/:page_num\r\n// 댓글 조회\r\n\r\n\r\nconst getComment = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n    const pageNum = Number(req.params.page_num);\r\n    let offset;\r\n\r\n    if (pageNum > 1) {\r\n      offset = 10 * (pageNum - 1);\r\n    }\r\n\r\n    // id / writer / title / content / createdAt / user_id\r\n    const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.findAll({\r\n      attributes: ['id', 'writer', 'content', 'createdAt', 'userId'],\r\n      where: { postId: postId },\r\n      offset: offset,\r\n      limit: 10\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Comment) {\r\n      res.status(200).send(Comment);\r\n    } else {\r\n      res.status(400);\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getComment);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/getComment.js?");

/***/ }),

/***/ "./controller/board/getMycomment.js":
/*!******************************************!*\
  !*** ./controller/board/getMycomment.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// PUT /board/posts\r\n// 선택 댓글 삭제\r\n\r\n\r\nconst getMycomment = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n    const pageNum = Number(req.params.page_num);\r\n    let offset;\r\n\r\n    if (pageNum > 1) {\r\n      offset = 10 * (pageNum - 1);\r\n    }\r\n\r\n    const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.findAll({\r\n      attributes: ['id', 'writer', 'content', 'createdAt', 'postId'],\r\n      where: {\r\n        userId: userId\r\n      },\r\n      order: [['createdAt', 'desc']],\r\n      offset: offset,\r\n      limit: 10\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Comment) {\r\n      res.status(200).json(Comment);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMycomment);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/getMycomment.js?");

/***/ }),

/***/ "./controller/board/getMypost.js":
/*!***************************************!*\
  !*** ./controller/board/getMypost.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /board/mypage/:user_id/posts/:page_num\r\n// 내가 쓴 글 조회\r\n\r\n\r\nconst getMypost = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n    const pageNum = Number(req.params.page_num);\r\n    let offset;\r\n\r\n    if (pageNum > 1) {\r\n      offset = 10 * (pageNum - 1);\r\n    }\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findAll({\r\n      attributes: ['id', 'writer', 'title', 'content', 'createdAt'],\r\n      where: {\r\n        userId: userId\r\n      },\r\n      order: [['createdAt', 'desc']],\r\n      offset: offset,\r\n      limit: 10\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).json(Post);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMypost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/getMypost.js?");

/***/ }),

/***/ "./controller/board/getPost.js":
/*!*************************************!*\
  !*** ./controller/board/getPost.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /board/:post_id/post\r\n// 글 조회\r\n\r\n\r\nconst getPost = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n\r\n    // id / writer / title / content / createdAt / user_id\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findOne({\r\n      attributes: ['id', 'writer', 'title', 'content', 'createdAt', 'userId'],\r\n      where: { id: postId }\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).send(Post);\r\n    } else {\r\n      res.status(400);\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/getPost.js?");

/***/ }),

/***/ "./controller/board/getPostlist.js":
/*!*****************************************!*\
  !*** ./controller/board/getPostlist.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /board/:page_num\r\n// 글 목록 조회\r\n\r\n\r\nconst getPostlist = async (req, res, next) => {\r\n  try {\r\n    const pageNum = Number(req.params.page_num);\r\n    let offset;\r\n\r\n    if (pageNum > 1) {\r\n      offset = 10 * (pageNum - 1);\r\n    }\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findAll({\r\n      attributes: [\r\n        'id',\r\n        'writer',\r\n        'title',\r\n        'numOfComment',\r\n        'createdAt',\r\n        'userId'\r\n      ],\r\n      order: [['createdAt', 'desc']],\r\n      offset: offset,\r\n      limit: 10\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).json(Post);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPostlist);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/getPostlist.js?");

/***/ }),

/***/ "./controller/board/postComment.js":
/*!*****************************************!*\
  !*** ./controller/board/postComment.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board/:post_id/comment/:user_id\r\n// 글 등록\r\n\r\n\r\nconst postComment = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n    const userId = Number(req.params.user_id);\r\n    const { content } = req.body;\r\n\r\n    const User = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].User.findOne({\r\n      where: { id: userId }\r\n    });\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.findOne({\r\n      where: { id: postId }\r\n    });\r\n\r\n    const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.create({\r\n      userId: `${userId}`, // Foreign Key\r\n      isAdmin: User.isAdmin,\r\n      postId: `${postId}`,\r\n      writer: User.nickname,\r\n      content: content\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Comment) {\r\n      const num = Post.numOfComment + 1;\r\n      console.log(num);\r\n      await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.update(\r\n        {\r\n          numOfComment: num\r\n        },\r\n        { where: { id: postId } }\r\n      );\r\n      res.status(200).json(Comment);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postComment);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/postComment.js?");

/***/ }),

/***/ "./controller/board/postPost.js":
/*!**************************************!*\
  !*** ./controller/board/postPost.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board/:user_id\r\n// 글 등록\r\n\r\n\r\nconst postPost = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n    const { title, content } = req.body;\r\n\r\n    const User = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].User.findOne({\r\n      where: { id: userId }\r\n    });\r\n\r\n    const isAdmin = User.isAdmin;\r\n    const nickname = User.nickname;\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.create({\r\n      userId: `${userId}`, // Foreign Key\r\n      isAdmin: isAdmin,\r\n      title: title,\r\n      content: content,\r\n      writer: nickname\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).json(Post);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postPost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/postPost.js?");

/***/ }),

/***/ "./controller/board/updateComment.js":
/*!*******************************************!*\
  !*** ./controller/board/updateComment.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board/:post_id/comment/:comment_id\r\n// 댓글 수정\r\n\r\n\r\nconst updatePost = async (req, res, next) => {\r\n  try {\r\n    // const postId = Number(req.params.post_id);\r\n    const commentId = Number(req.params.comment_id);\r\n    const { content } = req.body;\r\n\r\n    const Comment = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Comment.update(\r\n      {\r\n        content: content\r\n      },\r\n      { where: { id: commentId } }\r\n    );\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Comment) {\r\n      res.status(200).send('200 Ok');\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updatePost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/updateComment.js?");

/***/ }),

/***/ "./controller/board/updatePost.js":
/*!****************************************!*\
  !*** ./controller/board/updatePost.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /board/:post_id\r\n// 글 수정\r\n\r\n\r\nconst updatePost = async (req, res, next) => {\r\n  try {\r\n    const postId = Number(req.params.post_id);\r\n    const { title, content } = req.body;\r\n\r\n    const Post = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Post.update(\r\n      {\r\n        title: title,\r\n        content: content\r\n      },\r\n      { where: { id: postId } }\r\n    );\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    if (Post) {\r\n      res.status(200).send('200 OK');\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updatePost);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/board/updatePost.js?");

/***/ }),

/***/ "./controller/chatGPT/deleteList.js":
/*!******************************************!*\
  !*** ./controller/chatGPT/deleteList.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// DELETE /chatgpt/:list_id\r\n// 대화 목록 삭제 : 부모인 목록(List)을 삭제하면 자녀인 대화(Content)도 삭제되도록 설정\r\n\r\n\r\nconst deleteList = async (req, res, next) => {\r\n  try {\r\n    const listId = Number(req.params.list_id);\r\n\r\n    // list에서는 삭제가 되었는데, content에서는 동기화가 안됨,,\r\n    await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.destroy({\r\n      where: {\r\n        id: listId\r\n      }\r\n    });\r\n\r\n    // 결과를 API POST의 결과로 return\r\n    res.status(200).send('200 OK');\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteList);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/deleteList.js?");

/***/ }),

/***/ "./controller/chatGPT/getBookmark.js":
/*!*******************************************!*\
  !*** ./controller/chatGPT/getBookmark.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /chatgpt/:list_id\r\n// 대화 목록에서 북마크 표시한 메시지만 보여주는 API\r\n// 지금은 한 대화 목록에서 북마크 표시한 메시지만 보여주지만, 전체도 구현 예정\r\n// -> user_id를 query로 입력 받음 -> user_id로 해당 유저가 가진 목록 가져오기\r\n// -> 목록 하나하나 북마크 된 걸 list에 append -> return list\r\n\r\n\r\nconst getContent = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n    let Content = [];\r\n\r\n    const List = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.findAll({\r\n      attributes: ['id'],\r\n      where: { userId: userId }\r\n    });\r\n\r\n    // console.log('list count = ', List.length);\r\n    // console.log('id = ', List[0].dataValues.id);\r\n\r\n    for (let i = 0; i < List.length; i++) {\r\n      Content.push(\r\n        await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.findAll({\r\n          where: { bookmark: true, listId: List[i].dataValues.id }\r\n        })\r\n      );\r\n    }\r\n\r\n    if (Content) {\r\n      res.status(200).json(Content);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContent);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/getBookmark.js?");

/***/ }),

/***/ "./controller/chatGPT/getContent.js":
/*!******************************************!*\
  !*** ./controller/chatGPT/getContent.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /chatgpt/content/:list_id\r\n// 목록 중 하나를 선택했을 때 보이는 채팅 메시지들\r\n\r\n\r\nconst getContent = async (req, res, next) => {\r\n  try {\r\n    const listId = Number(req.params.list_id);\r\n\r\n    const Content = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.findAll({\r\n      where: { listId: listId }\r\n    });\r\n\r\n    if (Content) {\r\n      res.status(200).json(Content);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContent);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/getContent.js?");

/***/ }),

/***/ "./controller/chatGPT/getList.js":
/*!***************************************!*\
  !*** ./controller/chatGPT/getList.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// GET /chatgpt/list/:user_id\r\n// chatGPT 페이지 들어갔을 때 해당 유저의 모든 목록 조회\r\n\r\n\r\nconst getList = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n\r\n    const List = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.findAll({\r\n      where: { userId: userId }\r\n    });\r\n\r\n    if (List) {\r\n      res.status(200).json(List);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getList);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/getList.js?");

/***/ }),

/***/ "./controller/chatGPT/postAnswer.js":
/*!******************************************!*\
  !*** ./controller/chatGPT/postAnswer.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n/* harmony import */ var _middleware_chatgpt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../middleware/chatgpt.js */ \"./middleware/chatgpt.js\");\n// POST /chatgpt/:list_id/:qestion_num\r\n// 각각의 질문에 피드백 답변할 때\r\n\r\n\r\n\r\nconst postAnswer = async (req, res, next) => {\r\n  try {\r\n    const { list_id, question_num } = req.params;\r\n    const listId = Number(list_id);\r\n    const questionNum = Number(question_num);\r\n    const answer = req.body.answer;\r\n    console.log('listId = ', listId, ' / questionNum = ', questionNum);\r\n\r\n    // question_num에 맞는 질문 가져오기\r\n    const question = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.findAll({\r\n      attributes: ['content'],\r\n      where: {\r\n        listId: listId,\r\n        questionNum: questionNum\r\n      }\r\n    });\r\n\r\n    console.log('question = ', question[0].dataValues.content);\r\n\r\n    const content =\r\n      '질문은 다음과 같다: ' +\r\n      `${question[0].dataValues.content}` +\r\n      ' 답변은 다음과 같다: ' +\r\n      `${answer}` +\r\n      ' 답변에 피드백 해 줘';\r\n\r\n    console.log('content = ', content);\r\n\r\n    await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.create({\r\n      listId: `${listId}`,\r\n      sender: 'user',\r\n      content: content,\r\n      questionNum: questionNum\r\n    });\r\n\r\n    // 이후 middleware/chatgpt 실행\r\n    const response = await (0,_middleware_chatgpt_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(content);\r\n\r\n    const Content = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.create({\r\n      listId: `${listId}`,\r\n      sender: 'assistant',\r\n      content: response.content,\r\n      questionNum: questionNum\r\n    });\r\n\r\n    if (Content) {\r\n      res.status(200).json(Content);\r\n    } else {\r\n      res.status(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postAnswer);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/postAnswer.js?");

/***/ }),

/***/ "./controller/chatGPT/postContent.js":
/*!*******************************************!*\
  !*** ./controller/chatGPT/postContent.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n/* harmony import */ var _middleware_chatgpt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../middleware/chatgpt.js */ \"./middleware/chatgpt.js\");\n// POST /chatgpt/:list_id\r\n// chatGPT에게 메시지를 보낼 때\r\n\r\n\r\n// import { resourceLimits } from 'worker_threads';\r\n\r\nconst postContent = async (req, res, next) => {\r\n  try {\r\n    const listId = Number(req.params.list_id);\r\n    const { prompt, type, count } = req.body;\r\n    let content, ChatGPTContent;\r\n    if (count > 10) {\r\n      res.status(400).send('질문의 개수가 너무 많습니다.');\r\n    } else {\r\n      if (prompt) {\r\n        content =\r\n          '다음은 자기소개서야:' +\r\n          `${prompt}` +\r\n          ' 이걸 읽고 ' +\r\n          `${type}` +\r\n          '면접 질문 ' +\r\n          `${count}` +\r\n          '개 해 줘';\r\n      } else {\r\n        content = `${type}` + '면접 질문 ' + `${count}` + '개 해 줘';\r\n      }\r\n      console.log('content = ', content);\r\n      // 기존 메시지가 존재하지 않는다고 가정\r\n      await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.create({\r\n        listId: `${listId}`,\r\n        sender: 'user',\r\n        content: content\r\n      });\r\n\r\n      // 이후 middleware/chatgpt 실행\r\n      const response = await (0,_middleware_chatgpt_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(content);\r\n\r\n      // if ( response에 /n이 포함되어 있으면 ) -> 분리해서 넣기\r\n      if (response.content.includes('\\n')) {\r\n        const list = response.content.split('\\n');\r\n        console.log('list : ', list);\r\n        for (let i = 0; i < list.length; i++) {\r\n          if (list[i]) {\r\n            console.log('list[i][0] = ', list[i][0]); // 숫자나옴\r\n            ChatGPTContent = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.create({\r\n              listId: `${listId}`,\r\n              sender: 'assistant',\r\n              content: list[i],\r\n              questionNum: i + 1\r\n            });\r\n          }\r\n        }\r\n      } else {\r\n        ChatGPTContent = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.create({\r\n          listId: `${listId}`,\r\n          sender: 'assistant',\r\n          content: response.content\r\n        });\r\n      }\r\n\r\n      // 결과를 API POST의 결과로 return\r\n      if (ChatGPTContent) {\r\n        await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.update(\r\n          {\r\n            type: type\r\n          },\r\n          { where: { id: listId } }\r\n        );\r\n        ChatGPTContent = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.findAll({\r\n          where: { listId: listId, sender: 'assistant' }\r\n        });\r\n        res.status(200).json(ChatGPTContent);\r\n      } else {\r\n        res.status(400).send('400 Bad Request');\r\n      }\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postContent);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/postContent.js?");

/***/ }),

/***/ "./controller/chatGPT/postList.js":
/*!****************************************!*\
  !*** ./controller/chatGPT/postList.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /chatgpt/:user_id\r\n// 새로운 대화 시작이라면 ChatGPTList에 추가\r\n\r\n\r\nconst postList = async (req, res, next) => {\r\n  try {\r\n    const userId = Number(req.params.user_id);\r\n    const listName = req.body.name;\r\n\r\n    // 대화목록 개수 계산하기\r\n    const count = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.findAndCountAll({\r\n      where: {\r\n        userId: userId\r\n      }\r\n    });\r\n\r\n    if (count.count >= 30) {\r\n      res.status(400).send('대화목록을 더 이상 만들 수 없습니다.');\r\n    } else {\r\n      const duplication = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.findAll({\r\n        where: { userId: userId, name: listName }\r\n      });\r\n      if (duplication.length === 0) {\r\n        const List = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTList.create({\r\n          userId: `${userId}`, // Foreign Key\r\n          name: listName\r\n        });\r\n        // 결과를 API POST의 결과로 return\r\n        res.status(200).json(List);\r\n      } else {\r\n        res.status(400).send('대화목록 이름이 이미 있습니다.');\r\n      }\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postList);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/postList.js?");

/***/ }),

/***/ "./controller/chatGPT/setBookmark.js":
/*!*******************************************!*\
  !*** ./controller/chatGPT/setBookmark.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n// POST /chatgpt/bookmark/:content_id\r\n// Bookmark로 설정\r\n\r\n\r\nconst setBookmark = async (req, res, next) => {\r\n  try {\r\n    const contentId = Number(req.params.content_id);\r\n    const status = req.query.isBookmarked;\r\n\r\n    const bookmark = await _models_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ChatGPTContent.update(\r\n      {\r\n        bookmark: status\r\n      },\r\n      { where: { id: contentId } }\r\n    );\r\n    if (bookmark[0] == 1) {\r\n      res.status(200).send('200 OK');\r\n    } else {\r\n      res.stuats(400).send('400 Bad Request');\r\n    }\r\n  } catch (err) {\r\n    next(err);\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setBookmark);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/chatGPT/setBookmark.js?");

/***/ }),

/***/ "./controller/loginUser.js":
/*!*********************************!*\
  !*** ./controller/loginUser.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/index.js */ \"./models/index.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nasync function login (req, res) {\r\n    const username = req.body.username;\r\n    const domain = req.body.domain;\r\n    const password = req.body.password;\r\n\r\n    if (username && domain && password) {\r\n        // EMAIL CHECK\r\n        const users = await _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.findAll({\r\n            where: {username: username, domain: domain}\r\n        });\r\n\r\n        if (users === null) { // EMAIL DOESN'T EXISTS\r\n            res.status(400).send('입력한 이메일 존재하지 않음');\r\n        } else { // EMAIL EXIST\r\n            let check = await bcrypt__WEBPACK_IMPORTED_MODULE_2__.compare(password, users[0].password);\r\n            if (!check) { // PASSWORD CHECK FALSE (LOGIN FAILURE)\r\n                res.status(400).send('비밀번호 틀림');\r\n            } else { // PASSWORD CHECK TRUE (LOGIN SUCCESS)\r\n                const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__.sign({id: users[0].id, isAdmin: users[0].isAdmin}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '60m'});\r\n                res.cookie('accessToken', accessToken, {httpOnly: true});\r\n                res.status(200).send('토큰 전송 완료');\r\n            }\r\n        }\r\n    } else {\r\n        res.status(400).send('이메일 혹은 비밀번호가 입력되지 않음');\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    login\r\n});\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/loginUser.js?");

/***/ }),

/***/ "./controller/signup/idcheck.js":
/*!**************************************!*\
  !*** ./controller/signup/idcheck.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n\r\n\r\n\r\nasync function idCheck (req, res) {\r\n    const username = req.body.username;\r\n    const domain = req.body.domain;\r\n\r\n    if (username && domain) {\r\n        const users = await _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.findAll({\r\n            where: {username: username, domain: domain}\r\n        });\r\n\r\n        if (users.length === 0) { // 사용가능 이메일\r\n            res.status(200).send('사용가능한 이메일');\r\n        } else { // 사용불가 이메일\r\n            res.status(400).send('이미 사용중인 이메일');\r\n        }\r\n    } else {\r\n        res.status(400).send(\"입력값 없음\");\r\n    }\r\n    \r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    idCheck\r\n});\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/signup/idcheck.js?");

/***/ }),

/***/ "./controller/signup/nicknameCheck.js":
/*!********************************************!*\
  !*** ./controller/signup/nicknameCheck.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n\r\n\r\n\r\nasync function nicknameCheck (req, res) {\r\n    const nickname = req.body.nickname;\r\n\r\n    if (nickname) { // 닉네임 입력\r\n        const users = await _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.findAll({\r\n            where: {nickname: nickname}\r\n        });\r\n\r\n        if (users.length === 0) { // 닉네임 사용가능\r\n            res.status(200).send('사용가능한 닉네임');\r\n        } else { // 닉네임 사용불가\r\n            res.status(400).send('이미 사용중인 닉네임');\r\n        }\r\n    } else { // 닉네임 입력하지 않음\r\n        res.status(400).send('입력값 없음');\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    nicknameCheck\r\n});\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/signup/nicknameCheck.js?");

/***/ }),

/***/ "./controller/signup/passwordCheck.js":
/*!********************************************!*\
  !*** ./controller/signup/passwordCheck.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n\r\n\r\n\r\nfunction passwordCheck (req, res) {\r\n    const password = req.body.password;\r\n    const passwordVerify = req.body.passwordVerify;\r\n\r\n    if (password && passwordVerify) {\r\n        if (password === passwordVerify) {\r\n            const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;\r\n            if (re.test(password)) {\r\n                res.status(200).send({\r\n                    \"message\": \"\",\r\n                    \"success\": true\r\n                })\r\n            } else {\r\n                res.status(400).send({\r\n                    \"message\": \"비밀번호 형식이 잘못 되었습니다. 영문자, 숫자, 특수문자 8-12자로 입력해주세요\",\r\n                    \"success\": false\r\n                })\r\n            }\r\n        } else {\r\n            res.status(400).send({\r\n                \"message\": \"비밀번호가 다릅니다.\",\r\n                \"success\": false\r\n            })\r\n        }\r\n    } else {\r\n        res.status(400).send({\r\n            \"message\": \"비밀번호가 입력되지 않았습니다.\",\r\n            \"success\": false\r\n        })\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    passwordCheck\r\n});\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/signup/passwordCheck.js?");

/***/ }),

/***/ "./controller/signup/registerProcess.js":
/*!**********************************************!*\
  !*** ./controller/signup/registerProcess.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index.js */ \"./models/index.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\r\n\r\n\r\nconst saltRounds = 10;\r\n\r\nfunction registerProcess(req, res) {\r\n  const username = req.body.username;\r\n  const domain = req.body.domain;\r\n  const password = req.body.password;\r\n  const passwordVerify = req.body.passwordVerify;\r\n  const nickname = req.body.nickname;\r\n\r\n  // 아이디, 비밀번호, 닉네임 모두 입력 받음\r\n  if (username && domain && password && passwordVerify && nickname) {\r\n    // username+domain 조건 만족하는지 체크\r\n    // username 이 User table 에 있는지 체크 -> 중복체크 -> API가 있는데?\r\n    // db 에 있으면 불가, 없으면 db 에 정보 저장하여 새 계정 생성\r\n    _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.findAll({\r\n      where: { username: username, domain: domain }\r\n    })\r\n      .then(result => {\r\n        if (result.length == 0) {\r\n          // test@domain.com 사용가능 확인됨\r\n          // 비밀번호 조건 (영문자, 숫자, 특수기호, 8이상 12이하) 만족하는지 체크\r\n          // if password != passwordVerify -> fail to sign up, else -> ?\r\n          // 비밀번호 암호화하여 저장?\r\n          if (password === passwordVerify) {\r\n            const re = /^[0-9a-zA-Z`~!@#$%^&*()-_=+?]{8,12}$/;\r\n            if (re.test(password)) {\r\n              const encryptedPW = bcrypt__WEBPACK_IMPORTED_MODULE_2__.hashSync(password, saltRounds);\r\n              // nickname 조건 만족하는지 체크\r\n              // nickname User table 에 있는지 체크 = 중복체크\r\n              // 있으면 불가, 없으면 db 에 정보 저장하기\r\n              _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.findAll({\r\n                where: { nickname: nickname }\r\n              })\r\n                .then(result => {\r\n                  if (result.length == 0) {\r\n                    // 중복 아님\r\n                    console.log('사용가능 닉네임');\r\n                    // db 에 저장 -> isAdmin 은 어떻게 정하지?\r\n                    // auth_email -> 이메일 인증 시스템 만든 후 update\r\n                    _models_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].User.create({\r\n                      isAdmin: false,\r\n                      username: username,\r\n                      domain: domain,\r\n                      password: encryptedPW,\r\n                      nickname: nickname,\r\n                      auth_email: false // 마이페이지에서 인증?\r\n                    });\r\n                  } else {\r\n                    // 이미 사용중\r\n                    // 오류코드 전송\r\n                    console.log('사용중인 닉네임');\r\n                    res\r\n                      .status(400)\r\n                      .send(\r\n                        \"<script>alert('사용중인 닉네임'); history.go(-1)</script>\"\r\n                      );\r\n                  }\r\n                })\r\n                .catch(function (err) {\r\n                  console.log(err);\r\n                });\r\n            } else {\r\n              // 오류코드 전송\r\n              console.log('비밀번호를 다시 입력해주세요');\r\n              res\r\n                .status(400)\r\n                .send(\r\n                  \"<script>alert('비밀번호 길이 오류 또는 문자 오류'); history.go(-1)</script>\"\r\n                );\r\n            }\r\n          } else {\r\n            console.log('비밀번호 불일치');\r\n            res\r\n              .status(400)\r\n              .send(\r\n                \"<script>alert('비밀번호 불일치'); history.go(-1)</script>\"\r\n              );\r\n          }\r\n        } else {\r\n          // 오류코드 전송\r\n          console.log('사용중인 이메일');\r\n          res\r\n            .status(400)\r\n            .send(\"<script>alert('사용중인 이메일'); history.go(-1)</script>\");\r\n        }\r\n      })\r\n      .catch(function (err) {\r\n        console.log(err);\r\n      });\r\n  } else if (username && domain && password && passwordVerify) {\r\n    // 닉네임 입력하지 않음\r\n    console.log('fill out your nickname');\r\n    res.status(400).json({ message: 'Fill out your nickname' });\r\n  } else {\r\n    // 아이디 or 비밀번호 or 닉네임 입력하지 않음\r\n    console.log(\"User didn't fill out the value(s)\");\r\n    res.status(400).json({ message: 'Fill out the blank' });\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  registerProcess\r\n});\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./controller/signup/registerProcess.js?");

/***/ }),

/***/ "./middleware/auth.js":
/*!****************************!*\
  !*** ./middleware/auth.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\r\n\r\nfunction auth(req, res, next) {\r\n    try { // 인증 성공\r\n        console.log(req.headers.authorization.split('Bearer ')[1]);\r\n        req.decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.verify(req.headers.authorization.split('Bearer ')[1], process.env.ACCESS_TOKEN_SECRET_KEY);\r\n        return next();\r\n    } catch (err) { // 인증 실패\r\n        if (err.name === 'TokenExpiredError') { // 유효시간 초과된 경우\r\n            return res.status(419).send(\"토큰 만료\");\r\n        }\r\n        if (err.name === 'JsonWebTokenError') { // 토큰 비밀키 일치하지 않는 경우\r\n            return res.status(401).send(\"유효하지 않은 토큰\");\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    auth\r\n});\n\n//# sourceURL=webpack://nyangnyanggompeng/./middleware/auth.js?");

/***/ }),

/***/ "./middleware/chatgpt.js":
/*!*******************************!*\
  !*** ./middleware/chatgpt.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! openai */ \"openai\");\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\r\n\r\nconst callChatGPT = async prompt => {\r\n  const configiration = new openai__WEBPACK_IMPORTED_MODULE_1__.Configuration({\r\n    apiKey: process.env.OPENAI_API_KEY,\r\n    organization: process.env.OPENAI_ORGANIZATION\r\n  });\r\n  try {\r\n    const openai = new openai__WEBPACK_IMPORTED_MODULE_1__.OpenAIApi(\r\n      configiration\r\n    ); /* openai에서 발급 받은 비밀키, 조직ID로 객체를 생성합니다 */\r\n\r\n    const response = await openai.createChatCompletion({\r\n      /* 생성된 객체로 openAI의 여러가지 모델 중 하나인 gpt-3.5-turbo에 요청을 보냅니다. */\r\n      model: 'gpt-3.5-turbo',\r\n      messages: [{ role: 'user', content: prompt }]\r\n    });\r\n    return response.data.choices[0].message;\r\n  } catch (error) {\r\n    console.error('callGpt35() error >>> ', error);\r\n    return null;\r\n  }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (callChatGPT);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./middleware/chatgpt.js?");

/***/ }),

/***/ "./models/Schema/ChatGPTContent.js":
/*!*****************************************!*\
  !*** ./models/Schema/ChatGPTContent.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ChatGPTContent = (sequelize, DataTypes) => {\r\n  const ChatGPTContent = sequelize.define(\r\n    'ChatGPTContent',\r\n    {\r\n      questionNum: {\r\n        type: DataTypes.INTEGER,\r\n        defaultValue: 0\r\n      },\r\n      sender: {\r\n        type: DataTypes.STRING(10),\r\n        allowNull: false\r\n      },\r\n      content: {\r\n        type: DataTypes.STRING(3500),\r\n        allowNull: false,\r\n        defaultValue: ''\r\n      },\r\n      bookmark: {\r\n        type: DataTypes.BOOLEAN,\r\n        allowNull: false,\r\n        defaultValue: false\r\n      }\r\n    },\r\n    {\r\n      charset: 'utf8',\r\n      collate: 'utf8_general_ci', // 한글 저장\r\n      timestamps: true,\r\n      paranoid: true\r\n    }\r\n  );\r\n\r\n  return ChatGPTContent;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatGPTContent);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/Schema/ChatGPTContent.js?");

/***/ }),

/***/ "./models/Schema/ChatGPTList.js":
/*!**************************************!*\
  !*** ./models/Schema/ChatGPTList.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ChatGPTList = (sequelize, DataTypes) => {\r\n  const ChatGPTList = sequelize.define(\r\n    'ChatGPTList',\r\n    {\r\n      name: {\r\n        type: DataTypes.STRING(20),\r\n        allowNull: false //필수\r\n      },\r\n      type: {\r\n        type: DataTypes.STRING(10),\r\n        defaultValue: ''\r\n      }\r\n    },\r\n    {\r\n      charset: 'utf8',\r\n      collate: 'utf8_general_ci', // 한글 저장\r\n      timestamps: true,\r\n      paranoid: true\r\n    }\r\n  );\r\n\r\n  return ChatGPTList;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatGPTList);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/Schema/ChatGPTList.js?");

/***/ }),

/***/ "./models/Schema/Comment.js":
/*!**********************************!*\
  !*** ./models/Schema/Comment.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Comment = (sequelize, DataTypes) => {\r\n  const Comment = sequelize.define(\r\n    'Comment',\r\n    {\r\n      writer: {\r\n        type: DataTypes.STRING(10),\r\n        allowNull: false //필수\r\n      },\r\n      content: {\r\n        type: DataTypes.TEXT,\r\n        allowNull: false\r\n      }\r\n    },\r\n    {\r\n      charset: 'utf8',\r\n      collate: 'utf8_general_ci', // 한글 저장\r\n      timestamps: true,\r\n      paranoid: true\r\n    }\r\n  );\r\n\r\n  return Comment;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/Schema/Comment.js?");

/***/ }),

/***/ "./models/Schema/Post.js":
/*!*******************************!*\
  !*** ./models/Schema/Post.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Post = (sequelize, DataTypes) => {\r\n  const Post = sequelize.define(\r\n    'Post',\r\n    {\r\n      writer: {\r\n        type: DataTypes.STRING(10)\r\n      },\r\n      title: {\r\n        type: DataTypes.STRING(30),\r\n        allowNull: false\r\n      },\r\n      content: {\r\n        type: DataTypes.TEXT,\r\n        allowNull: false\r\n      },\r\n      numOfComment: {\r\n        type: DataTypes.INTEGER,\r\n        defaultValue: 0\r\n      }\r\n    },\r\n    {\r\n      charset: 'utf8',\r\n      collate: 'utf8_general_ci', // 한글 저장\r\n      timestamps: true,\r\n      paranoid: true\r\n    }\r\n  );\r\n\r\n  return Post;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Post);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/Schema/Post.js?");

/***/ }),

/***/ "./models/Schema/User.js":
/*!*******************************!*\
  !*** ./models/Schema/User.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst User = (sequelize, DataTypes) => {\r\n  const User = sequelize.define(\r\n    'User',\r\n    {\r\n      id: {\r\n        type: DataTypes.INTEGER,\r\n        allowNull: false,\r\n        primaryKey: true,\r\n        autoIncrement: true\r\n      },\r\n      isAdmin: {\r\n        type: DataTypes.BOOLEAN,\r\n        allowNull: false,\r\n        primaryKey: true\r\n      },\r\n      username: {\r\n        type: DataTypes.STRING(20),\r\n        allowNull: false //필수\r\n      },\r\n      domain: {\r\n        type: DataTypes.STRING(20),\r\n        allowNull: false //필수\r\n      },\r\n      password: {\r\n        type: DataTypes.TEXT,\r\n        allowNull: false //필수\r\n      },\r\n      nickname: {\r\n        type: DataTypes.STRING(8),\r\n        allowNull: false,\r\n        unique: true\r\n      },\r\n      authEmail: {\r\n        type: DataTypes.BOOLEAN,\r\n        allowNull: false,\r\n        defaultValue: false\r\n      }\r\n    },\r\n    {\r\n      charset: 'utf8',\r\n      collate: 'utf8_general_ci', // 한글 저장\r\n      timestamps: true,\r\n      paranoid: true\r\n    }\r\n  );\r\n\r\n  return User;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/Schema/User.js?");

/***/ }),

/***/ "./models/index.js":
/*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var _Schema_User_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Schema/User.js */ \"./models/Schema/User.js\");\n/* harmony import */ var _Schema_ChatGPTList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Schema/ChatGPTList.js */ \"./models/Schema/ChatGPTList.js\");\n/* harmony import */ var _Schema_ChatGPTContent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Schema/ChatGPTContent.js */ \"./models/Schema/ChatGPTContent.js\");\n/* harmony import */ var _Schema_Post_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Schema/Post.js */ \"./models/Schema/Post.js\");\n/* harmony import */ var _Schema_Comment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Schema/Comment.js */ \"./models/Schema/Comment.js\");\n/* harmony import */ var _config_config_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/config.json */ \"./config/config.json\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst env = \"development\" || 0; // 추후 배포할 때는 process.env.NODE_ENV를 production으로 설정\r\n\r\nconst config = _config_config_json__WEBPACK_IMPORTED_MODULE_6__[env];\r\n\r\nconst db = {};\r\n\r\nconst sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0__(\r\n  config.database,\r\n  config.username,\r\n  config.password,\r\n  config\r\n);\r\n\r\ndb.sequelize = sequelize;\r\ndb.Sequelize = sequelize__WEBPACK_IMPORTED_MODULE_0__;\r\ndb.User = (0,_Schema_User_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0__);\r\ndb.ChatGPTList = (0,_Schema_ChatGPTList_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0__);\r\ndb.ChatGPTContent = (0,_Schema_ChatGPTContent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0__);\r\ndb.Post = (0,_Schema_Post_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0__);\r\ndb.Comment = (0,_Schema_Comment_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0__);\r\n\r\n// User - ChatGPTList\r\ndb.User.hasMany(db.ChatGPTList, {\r\n  foreignKey: 'userId',\r\n  sourceKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.ChatGPTList.belongsTo(db.User, {\r\n  foreignKey: 'userId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\n\r\n// ChatGPTList - ChatGPTContent\r\ndb.ChatGPTList.hasMany(db.ChatGPTContent, {\r\n  foreignKey: 'listId',\r\n  sourceKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.ChatGPTContent.belongsTo(db.ChatGPTList, {\r\n  foreignKey: 'listId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\n\r\n// User - Post\r\ndb.User.hasMany(db.Post, {\r\n  foreignKey: 'userId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.Post.belongsTo(db.User, {\r\n  foreignKey: 'userId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.User.hasMany(db.Post, {\r\n  foreignKey: 'isAdmin',\r\n  targetKey: 'isAdmin',\r\n  onDelete: 'cascade'\r\n});\r\ndb.Post.belongsTo(db.User, {\r\n  foreignKey: 'isAdmin',\r\n  targetKey: 'isAdmin',\r\n  onDelete: 'cascade'\r\n});\r\n\r\n// User - Comment\r\ndb.User.hasMany(db.Comment, {\r\n  foreignKey: 'userId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.Comment.belongsTo(db.User, {\r\n  foreignKey: 'userId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.User.hasMany(db.Comment, {\r\n  foreignKey: 'isAdmin',\r\n  targetKey: 'isAdmin',\r\n  onDelete: 'cascade'\r\n});\r\ndb.Comment.belongsTo(db.User, {\r\n  foreignKey: 'isAdmin',\r\n  targetKey: 'isAdmin',\r\n  onDelete: 'cascade'\r\n});\r\n\r\n// Post - Comment\r\ndb.Post.hasMany(db.Comment, {\r\n  foreignKey: 'postId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\ndb.Comment.belongsTo(db.Post, {\r\n  foreignKey: 'postId',\r\n  targetKey: 'id',\r\n  onDelete: 'cascade'\r\n});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./models/index.js?");

/***/ }),

/***/ "./routes/board.js":
/*!*************************!*\
  !*** ./routes/board.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controller_board_getPostlist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/board/getPostlist.js */ \"./controller/board/getPostlist.js\");\n/* harmony import */ var _controller_board_getPost_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/board/getPost.js */ \"./controller/board/getPost.js\");\n/* harmony import */ var _controller_board_postPost_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/board/postPost.js */ \"./controller/board/postPost.js\");\n/* harmony import */ var _controller_board_updatePost_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/board/updatePost.js */ \"./controller/board/updatePost.js\");\n/* harmony import */ var _controller_board_deletePost_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controller/board/deletePost.js */ \"./controller/board/deletePost.js\");\n/* harmony import */ var _controller_board_getComment_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controller/board/getComment.js */ \"./controller/board/getComment.js\");\n/* harmony import */ var _controller_board_postComment_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controller/board/postComment.js */ \"./controller/board/postComment.js\");\n/* harmony import */ var _controller_board_updateComment_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controller/board/updateComment.js */ \"./controller/board/updateComment.js\");\n/* harmony import */ var _controller_board_deleteComment_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controller/board/deleteComment.js */ \"./controller/board/deleteComment.js\");\n/* harmony import */ var _controller_board_getMypost_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../controller/board/getMypost.js */ \"./controller/board/getMypost.js\");\n/* harmony import */ var _controller_board_getMycomment_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../controller/board/getMycomment.js */ \"./controller/board/getMycomment.js\");\n/* harmony import */ var _controller_board_deleteMyposts_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../controller/board/deleteMyposts.js */ \"./controller/board/deleteMyposts.js\");\n/* harmony import */ var _controller_board_deleteMycomments_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../controller/board/deleteMycomments.js */ \"./controller/board/deleteMycomments.js\");\n\r\n\r\n\r\n\r\n// import getBoard from '../controller/board/getBoard.js';\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/:page_num', _controller_board_getPostlist_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]); // localhost:5000/api/board/:page_num\r\n//router.get('/posts/:post_id', getBoard); // localhost:5000/api/board/:post_id\r\n\r\nrouter.get('/posts/:post_id', _controller_board_getPost_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]); // localhost:5000/api/board/posts/:post_id/\r\nrouter.post('/:user_id', _controller_board_postPost_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]); // localhost:5000/api/board/:user_id\r\nrouter.patch('/:post_id', _controller_board_updatePost_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]); // localhost:5000/api/board/:post_id\r\nrouter.put('/:post_id', _controller_board_deletePost_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]); // localhost:5000/api/board/:post_id\r\n\r\nrouter.get('/:post_id/comments', _controller_board_getComment_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]); // localhost:5000/api/board/:post_id/comments\r\nrouter.post('/:post_id/comments/:user_id', _controller_board_postComment_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]); // localhost:5000/api/board/:post_id/comments/:user_id\r\nrouter.patch('/:post_id/comments/:comment_id', _controller_board_updateComment_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]); // localhost:5000/api/board/:post_id/comments/:comment_id\r\nrouter.put('/:post_id/comments/:comment_id', _controller_board_deleteComment_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]); // localhost:5000/api/board/:post_id/comments/:comment_id\r\n\r\nrouter.get('/mypage/:user_id/posts/:page_num', _controller_board_getMypost_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]); // localhost:5000/api/board/:user_id/posts\r\nrouter.get('/mypage/:user_id/comments/:page_num', _controller_board_getMycomment_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]); // localhost:5000/api/board/:user_id/comments\r\nrouter.put('/mypage/posts', _controller_board_deleteMyposts_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]); // localhost:5000/api/board/:user_id/posts\r\nrouter.put('/mypage/comments', _controller_board_deleteMycomments_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]); // localhost:5000/api/board/:user_id/comments\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./routes/board.js?");

/***/ }),

/***/ "./routes/chatgpt.js":
/*!***************************!*\
  !*** ./routes/chatgpt.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controller_chatGPT_getList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/chatGPT/getList.js */ \"./controller/chatGPT/getList.js\");\n/* harmony import */ var _controller_chatGPT_postList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/chatGPT/postList.js */ \"./controller/chatGPT/postList.js\");\n/* harmony import */ var _controller_chatGPT_getContent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/chatGPT/getContent.js */ \"./controller/chatGPT/getContent.js\");\n/* harmony import */ var _controller_chatGPT_postContent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/chatGPT/postContent.js */ \"./controller/chatGPT/postContent.js\");\n/* harmony import */ var _controller_chatGPT_postAnswer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controller/chatGPT/postAnswer.js */ \"./controller/chatGPT/postAnswer.js\");\n/* harmony import */ var _controller_chatGPT_deleteList_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controller/chatGPT/deleteList.js */ \"./controller/chatGPT/deleteList.js\");\n/* harmony import */ var _controller_chatGPT_getBookmark_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controller/chatGPT/getBookmark.js */ \"./controller/chatGPT/getBookmark.js\");\n/* harmony import */ var _controller_chatGPT_setBookmark_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controller/chatGPT/setBookmark.js */ \"./controller/chatGPT/setBookmark.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/', (req, res) => {\r\n  res.render('chatgpt', {}); // views 폴더 밑에 있는 파일을 참조함\r\n});\r\nrouter.get('/list/:user_id', _controller_chatGPT_getList_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\nrouter.post('/list/:user_id', _controller_chatGPT_postList_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\nrouter.get('/content/:list_id', _controller_chatGPT_getContent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\nrouter.post('/content/:list_id', _controller_chatGPT_postContent_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\r\nrouter.post('/content/:list_id/:question_num', _controller_chatGPT_postAnswer_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\r\nrouter.put('/list/:list_id', _controller_chatGPT_deleteList_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\r\nrouter.get('/bookmark/:user_id', _controller_chatGPT_getBookmark_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\r\nrouter.get('/bookmark/set/:content_id', _controller_chatGPT_setBookmark_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./routes/chatgpt.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _users_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.js */ \"./routes/users.js\");\n/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chatgpt.js */ \"./routes/chatgpt.js\");\n/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.js */ \"./routes/register.js\");\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./board.js */ \"./routes/board.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\n// 페이지 로딩 함수\r\nrouter.get('/', (req, res) => {\r\n  res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함\r\n});\r\nrouter.use('/users', _users_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\nrouter.use('/chatgpt', _chatgpt_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\nrouter.use('/register', _register_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\nrouter.use('/board', _board_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./routes/index.js?");

/***/ }),

/***/ "./routes/register.js":
/*!****************************!*\
  !*** ./routes/register.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var _controller_signup_registerProcess_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/signup/registerProcess.js */ \"./controller/signup/registerProcess.js\");\n/* harmony import */ var _controller_signup_idcheck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/signup/idcheck.js */ \"./controller/signup/idcheck.js\");\n/* harmony import */ var _controller_signup_passwordCheck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/signup/passwordCheck.js */ \"./controller/signup/passwordCheck.js\");\n/* harmony import */ var _controller_signup_nicknameCheck_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controller/signup/nicknameCheck.js */ \"./controller/signup/nicknameCheck.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/', (req, res) => {\r\n    res.render('signup', {}); // views 폴더 밑에 있는 파일을 참조함\r\n});\r\n\r\nrouter.post('/register_process', _controller_signup_registerProcess_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].registerProcess);\r\nrouter.post('/idcheck', _controller_signup_idcheck_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].idCheck);\r\nrouter.post('/password_check', _controller_signup_passwordCheck_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].passwordCheck);\r\nrouter.post('/nickname_check', _controller_signup_nicknameCheck_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].nicknameCheck)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://nyangnyanggompeng/./routes/register.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controller_loginUser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/loginUser.js */ \"./controller/loginUser.js\");\n/* harmony import */ var _middleware_auth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middleware/auth.js */ \"./middleware/auth.js\");\n\r\n\r\n\r\n\r\n//import logout from '../controller/logout.js';\r\n\r\n// import { User } from '../models/index.js';\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.post('/login', _controller_loginUser_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].login);\r\n//router.get('/logout', logout);\r\nrouter.get('/auth', _middleware_auth_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].auth, (req, res) => {\r\n  console.log(\"토큰 검증 완료\");\r\n  res.send(req.decoded);\r\n});\r\n\r\n// router.get('/', (req, res) => {\r\n//   // res.render('', {}); // views 폴더 밑에 있는 파일을 참조함\r\n// });\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://nyangnyanggompeng/./routes/users.js?");

/***/ }),

/***/ "./config/config.json":
/*!****************************!*\
  !*** ./config/config.json ***!
  \****************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"development\":{\"username\":\"admin\",\"password\":\"admin123\",\"database\":\"nyangnyanggompeng\",\"host\":\"nyangnyanggompeng.cy0uihtlhscp.ap-northeast-2.rds.amazonaws.com\",\"port\":3306,\"dialect\":\"mysql\"},\"test\":{\"username\":\"root\",\"password\":null,\"database\":\"database_test\",\"host\":\"127.0.0.1\",\"dialect\":\"mysql\"},\"production\":{\"username\":\"root\",\"password\":null,\"database\":\"database_production\",\"host\":\"127.0.0.1\",\"dialect\":\"mysql\"}}');\n\n//# sourceURL=webpack://nyangnyanggompeng/./config/config.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;