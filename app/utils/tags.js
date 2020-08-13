export default {
  getTagsFromPosts: (posts, searchQuery) => {
    let newTags = [];
    let exists;

    if (posts[0]) {
      for (var i = 0; i < posts.length; i++) {
        for (var j = 0; j < posts[i].tag.length; j++) {
          exists = false;
          let tag = posts[i].tag[j];

          for (var k = 0; k < newTags.length; k++) {
            if (newTags[k].id === tag.id) {
              exists = true;
            }
          }

          if (!exists) {
            if (searchQuery !== undefined)
              tag.active = searchQuery.indexOf(tag.name) > -1;
            newTags.push(tag);
          }
        }
      }
    }
    return newTags;
  },
};
