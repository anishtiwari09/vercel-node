const Quizdata = require("../Models/quizquestion.model");
const fetchAllQuizQuestion = async () => {
  return await Quizdata.find();
};
const getQuizQuestion = async (req, res) => {
  try {
    const { quiz } = req;
    const data = await Quizdata.findOne({ _id: quiz?.questionId });
    delete quiz.quizDetails.userId;
    return res
      .status(200)
      .json({
        status: true,
        quizData: data,
        quizDetails: quiz?.quizDetails || {},
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "internal server error", status: false });
  }
};
module.exports = { getQuizQuestion, fetchAllQuizQuestion };
