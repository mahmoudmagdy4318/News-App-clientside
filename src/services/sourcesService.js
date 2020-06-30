import axiosInstance from "../API/axiosInstance";

//function to get all sources
const getAllSources = async (filter, page) => {
  const { category, language, country } = filter;
  const queryString = `page=${page || 1}&language=${language || ""}&country=${
    country || ""
  }&category=${category || ""}`;
  try {
    const data = await axiosInstance.get(`sources?${queryString}`);
    return data;
  } catch (error) {
    return error;
  }
};

//function to get subscribed sources of current authenticated user
const getUserSubscribedSources = (id) => {
  return axiosInstance.get(`users/${id}/sources`);
};

//function for user new subscriptions
const subscribe = (id, sid) => {
  return axiosInstance.patch(`users/${id}/sources/${sid}`, {
    action: "subscribe",
  });
};

//function for unsubscription of user of specific source
const unSubscribe = (id, sid) => {
  return axiosInstance.patch(`users/${id}/sources/${sid}`, {
    action: "unsubscribe",
  });
};
export { getAllSources, getUserSubscribedSources, subscribe, unSubscribe };
