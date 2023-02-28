export const userQuery = (userId) => {
  //Get the document 'user' from ../../../smedio_backend/schemas where user is userId
  const query = `*[_type == 'user' && _id == '${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  //In Home.jsx load all serch terms and/or categories with all the info that come with it.
  const query = `*[_type == 'post' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{  
    file {
          asset -> {
              url
          }
      },
      _id,
      postedBy -> {
          _id,
          userName,
          image
      },
      likes,
      title,
      createdAt,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;

  return query;
};

export const feedQuery = `*[_type == 'post'] | order(_createdAt desc) {
  file {
      asset -> {
          url
      }
  },
  _id,
  postedBy -> {
      _id,
      userName,
      image
  },
  likes,
  title,
  createdAt,
  comments[]{
    comment,
    _key,
    postedBy->{
    _id,
    userName,
    image
  },
  }
}`;
