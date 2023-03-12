import axios from 'axios';

const BASE_URL = 'https://chat-translation.vercel.app/api/';

export const getAnswer = async (queston: string) => {
  try {
    const res = await axios.post(`${BASE_URL}ask-a-question?prompt=what`, {
      queston,
    });
    if (res.status === 200) {
      return res?.data.answer;
    } else {
      console.error(`Request failed with status code ${res.status}`);
      return 'Something went wrong!!';
    }
  } catch (error) {
    console.error(error);
    return 'Something went wrong!!';
  }
};

export const getTranslatedText = async (query: string, language: string) => {
  try {
    const res = await axios.post(`${BASE_URL}translate?prompt=what`, {
      query,
      language,
    });
    if (res.status === 200) {
      return res?.data.answer;
    } else {
      console.error(`Request failed with status code ${res.status}`);
      return 'Something went wrong!!';
    }
  } catch (error) {
    console.error(error);
    return 'Something went wrong!!';
  }
};
