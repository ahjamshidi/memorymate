import { fetchWrapper } from '@/lib/fetchWrapper';
import { CONFIG } from './../constances/main';
export const setCardReview = async (data:{}) => {
  const topics = await fetchWrapper.post(`${CONFIG.BASE_URL}api/cards`, data);
  return topics;
};
export const getTopics = async () => {
  const topics = await fetchWrapper.get(`${CONFIG.BASE_URL}api/topic`);
  return topics;
};
export const getTopicsById = async (id: number) => {
  const cards = await fetchWrapper.get(
    `${CONFIG.BASE_URL}api/getStudyCardList/${id}`
  );
  return cards;
};
