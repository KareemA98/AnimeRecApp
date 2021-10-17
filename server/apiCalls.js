const axios = require("axios")
const https = require('https')

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

var NarutoQuery = `
 { 
  Media (search: "Naruto" type: ANIME) { 
    id
    genres
    seasonYear
    type
    tags{
        id
        name
    }
    title {
      romaji
      english
      native
    }
  }
}
`;
var TagQuery = `
query($tag: String){
  Page(page: 1, perPage: 10) {
    pageInfo {
      total
    }
    media(tag: $tag, type: ANIME, sort:POPULARITY_DESC) {
      id
      idMal
      genres
      seasonYear
      coverImage {
        extraLarge
        large
        medium
        color
      }
      type
      startDate {
        year
        month
        day
      }
      tags {
        id
        name
      }
      title {
        romaji
      }
      
    }
  }
}
`;

exports.anotherTry = async () => {
  const response = await axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: NarutoQuery, variables: {} } });
  const tags = response.data.data.Media.tags;
  return tags
}

exports.getTagsInfo = async (tag) => {
 const response = await axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: TagQuery, variables: { tag: tag } } })
 return response.data
}

exports.getImage = async (id, session, db) => {
  const check = await checkDatabase(id, db);
  console.log(check)
  if (check) { return check } else {
    acc = await getAccessToken(session, db)
    return axios({ method: "get", url: 'https://api.myanimelist.net/v2/anime/' + id + '?fields=id,title,main_picture', headers: { Authorization: `Bearer ${acc}` } })
      .then((res) => {
        console.log("api")
        addImageToDatabase(id, db, res.data.main_picture.medium)
        return res.data.main_picture.medium
      })
  }
}

const addImageToDatabase = async (id, db, image) => {
  try {
    const col = db.collection("shows");
    let show = {
      "_id": id,
      "image": image
    }
    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(show);
    // Insert a single document, wait for promise so we can read it back
  } catch (err) {
    console.log(err.stack);
    return "fail"
  }
}
const checkDatabase = async (id, db) => {
  try {
    const col = db.collection("shows");
    const r = await col.find({ _id: id }).toArray()
    return r.length ? r[0].image : 0
    // Insert a single document, wait for promise so we can read it back
  } catch (err) {
    console.log(err.stack);
    return "fail"
  }
}
const getAccessToken = async (session, db) => {
  try {
    const col = db.collection("sessions");
    const r = await col.find({ _id: session }).toArray()
    // Insert a single document, wait for promise so we can read it back
    return r[0].accessToken
  } catch (err) {
    console.log(err.stack);
    return "fail"
  }
}