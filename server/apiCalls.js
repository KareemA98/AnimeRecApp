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

var SearchQuery = `
query ($anime: String) {
  Page(page: 1, perPage: 10) {
    pageInfo {
      total
    }
    media(search: $anime, type: ANIME) {
      title {
        romaji
        english
        native
      }
    }
  }
}
`

var NarutoQuery = `
query ($anime: String) {
  Media(search: $anime, type: ANIME) {
    id
    genres
    seasonYear
    type
    tags {
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
query($tag: String $idsNot:[Int] $page:Int){
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
    }
    media(tag: $tag, type: ANIME, sort:POPULARITY_DESC idMal_not_in:$idsNot) {
      id
      idMal
      trailer {
        id
        site
      }
      description
      status
      externalLinks {
        id
        site
        url
      }
      episodes
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
        english
        romaji
      }
      
    }
  }
}
`;

exports.anotherTry = async (show) => {
  return axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: NarutoQuery, variables: { anime: show } } })
    .then(res => {
      return res.data.data.Media.tags
    })
    .catch(err => console.log(err))
}

exports.search = (term) => {
  return axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: SearchQuery, variables: { anime: term } } })
    .then(res => {
      return res.data
    })
}

exports.AddToMal = async (session, id, db) => {
  const token = await getAccessToken(session, db)
  return axios({
    method:"patch",
    data: "status=plan_to_watch",
    url: `https://api.myanimelist.net/v2/anime/${id}/my_list_status`,
    headers: {Authorization: `Bearer ${token}`, 'content-type': "application/x-www-form-urlencoded"},
  })
  .then (res => {
    console.log(res)
    return res.data
  } )
  .catch(err => console.log(err))
}

exports.getTagsInfo = async (tag, completed, page) => {
  const ids = Object.keys(completed).map(pip => parseInt(pip))
  const response = await axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: TagQuery, variables: { tag: tag, idsNot: ids, page: page } } })
  return response.data
}
const getList = async (token, offset) => {
  return axios({ method: "get", url: `https://api.myanimelist.net/v2/users/@me/animelist?offset=${offset}&status=completed&fields=list_status`, headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      return res.data.data
    })
    .catch(err => console.log(err))
}

const entireMALList = async (acc, offset = 0) => {
  const results = await getList(acc, offset)
  // console.log("Retreiving data from API for numbers : " + offset);
  if (results.length > 0) {
    return results.concat(await entireMALList(acc, offset + 10));
  } else {
    return results;
  }
}

exports.getMALList = async (session, db) => {
  acc = await getAccessToken(session, db)
  const entireList = await entireMALList(acc);
  return entireList
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