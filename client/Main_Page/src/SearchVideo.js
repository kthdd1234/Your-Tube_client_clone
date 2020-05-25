export const searchVideo = (keyword, YouTubeData, callback) => {
  let filterVideos = [];
  keyword = keyword.replace(/(\s*)/g, ""); //

  for (const video of YouTubeData) {
    const { title, description, channelId } = video;
    const searchKeyword = {
      title: title.replace(/(\s*)/g, ""),
      description: description.replace(/(\s*)/g, ""),
      channelId: channelId.replace(/(\s*)/g, ""),
    };

    for (let key in searchKeyword) {
      if (searchKeyword[key].includes(keyword)) {
        filterVideos.push(video);
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

  console.log("문자열에 공백을 제거하여 필터링 한 데이터: ", filterVideos);
  return callback(filterVideos);
};
