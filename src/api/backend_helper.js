import { get } from "./api";

//Post
export const getParents = () => get('/parent');

//Post
export const getPostDetails = (id) =>
  get('/posts', {
    params: {
      id: id,
    },
 });