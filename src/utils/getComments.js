import * as ApiClient from '../ApiClient';

export default allPosts => {
  const promiseArray = [];
  allPosts.map(post => {
    console.log(post.get('id'));
    promiseArray.push(
      new Promise(async (resolve, reject) => {
        try {
          let response = await ApiClient.getCommentsByPost(post.get('id'));
          resolve(response);
        } catch (err) {
          reject(err);
        }
      }),
    );
  });
  return promiseArray;
};
