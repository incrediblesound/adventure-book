import axios from 'axios'
import GameState from './GameState'

export default class Session {
  constructor(){
    this.gameState = null
    this.data = {
      user: null,
    }
    this.listeners = []
  }
  get(key, defaultValue){
    return this.data[key] || defaultValue
  }
  onUpdate(cb){
    this.listeners.push(cb)
  }
  update(){
    this.listeners.forEach(cb => {
      cb()
    })
  }
  /* AUTHENTICATION */
  authenticate(){
    return axios.post('/api/auth').then(response => {
      const isAuthenticated = response.data
      if(!isAuthenticated){
        this.navigate('login')
      } else {
        this.data.user = response.data
      }
      return true
    })
  }
  startSession(user){
    this.data.user = user
  }
  createUser(user){
    return axios.post('/api/signup', user)
  }
  logIn(user){
    return axios.post('/api/login', user)
  }
  logOut(){
    this.data.user = null;
    axios.get('/api/logout')
  }
  getUsername(){
    return this.data.user && this.data.user.username
  }
  /* STORIES */
  saveStory(story){
    const { username } = this.data.user
    story.author = username
    story.published = false
    return axios.post('/api/story', { story })
  }
  updateStory(story){
    return axios.put('api/story', story)
  }
  fetchStory(id){
    return axios.get(`api/story/${id}`)
  }
  fetchStories(category, value){
    let request
    if(category){
      request = axios.get(`/api/stories/${value}`)
    } else {
      request = axios.get('/api/stories')
    }
    request.then(response => {
      const stories = response.data.stories
      this.data.stories = stories || []
      this.update()
    })
  }
  /* GAME STATE */
  startStory(gameData, game){
    this.gameState = new GameState(gameData, game, this)
  }
}
