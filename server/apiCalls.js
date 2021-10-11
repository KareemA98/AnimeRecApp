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

// Define our query variables and values that will be used in the query request
var variables = {
    id: 15125
};

exports.getDataAboutAnime = () => {
    return axios({ 
        method: "post",
        url: 'https://graphql.anilist.co',
        data: {query: NarutoQuery, variables: {}}
    }).then(res => {
        console.log(res)
        console.log(res.data)
        return res.data
    })
}