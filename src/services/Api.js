import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://www.ebi.ac.uk/proteins/api`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
