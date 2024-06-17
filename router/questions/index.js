import { Router } from "express";
import QuestionCTL from "../../controller/question/index.js";

const questionRouter = Router();

questionRouter.post('/', QuestionCTL.createQuestion);
questionRouter.put('/questId', QuestionCTL.updateQuestion);
questionRouter.get('/', QuestionCTL.questionListBySubject);
questionRouter.delete('/questId', QuestionCTL.deleteQuestion)


export default questionRouter;