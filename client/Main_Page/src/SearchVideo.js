export const searchVideo = (keyword, YouTubeData, callback) => {
  let filterVideos = [];

  for (let video of YouTubeData) {
    for (let key in video) {
      if (typeof video[key] !== "number") {
        if (video[key].includes(keyword)) {
          filterVideos.push(video);
        }
      }
    }
  }

  function deleteSameData(array) {
    return array.filter((item, i) => {
      return (
        array.findIndex((item2, j) => {
          return item.id === item2.id;
        }) === i
      );
    });
  }
  filterVideos = deleteSameData(filterVideos);
  console.log(filterVideos);
  return callback(filterVideos);
};
