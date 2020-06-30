import axiosInstance from "../API/axiosInstance";

//service to get user's news filtered and paginated
const getUserNews = async (id, page, filter) => {
  const { q, language } = filter;
  //query string of api request
  const queryString = `page=${page || 1}&language=${language || ""}&q=${
    q || ""
  }`;
  try {
    const { news } = await axiosInstance.get(`users/${id}/news?${queryString}`);
    return news;
  } catch (error) {
    return error;
  }
};

export { getUserNews };
