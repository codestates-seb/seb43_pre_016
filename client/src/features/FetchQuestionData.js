import axios from "axios";

const fetchQuestionData = (id, setQuestionData) => {
  axios.get(`/questions/${id}`).then((res) => {
    setQuestionData({ ...res.data });
  });
};

export default fetchQuestionData;
