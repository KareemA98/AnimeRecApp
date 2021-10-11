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
      genres
      seasonYear
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

// Define our query variables and values that will be used in the query request
var variables = {
  id: 15125
};

exports.getDataAboutAnime = () => {
  return axios({
    method: "post",
    url: 'https://graphql.anilist.co',
    data: { query: NarutoQuery, variables: {} }
  }).then(res => {
    const tags = res.data.data.Media.tags
    axiosList = tags.map(tag => axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: TagQuery, variables: { tag: tag.name } } }))
    console.log(tags)
    axios.all(axiosList)
      .then(results => {
        const obj = {}
        console.log(results)
        results.forEach((element, index) => {
          obj[tags[index].name] = element.data.data.Page.media
        })
        console.log(obj)
        return obj
      })
      .catch(err => console.log(err))
    return res.data
  })
}
exports.anotherTry = async () => {
  const response = await axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: NarutoQuery, variables: {} } });
  const tags = response.data.data.Media.tags;
  axiosList = tags.map(tag => axios({ method: "post", url: 'https://graphql.anilist.co', data: { query: TagQuery, variables: { tag: tag.name } } }))
  const tagResponse = await axios.all(axiosList)
  const obj = {};
  console.log(tagResponse)
  tagResponse.forEach((element, index) => {
    obj[tags[index].name] = element.data.data.Page.media
  })
  return obj
}