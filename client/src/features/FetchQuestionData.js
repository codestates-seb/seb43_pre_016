import axios from "axios";

const fetchQuestionData = (id, setQuestionData) => {
  axios.get(`${process.env.REACT_APP_API_URL}/questions/${id}`).then((res) => {
    setQuestionData({ ...res.data });
  });
};

export default fetchQuestionData;
