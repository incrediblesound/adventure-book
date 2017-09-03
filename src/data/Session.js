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
  isAuthenticated(){
    return !!this.data.user
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
  }
  getUsername(){
    return this.data.user && this.data.user.name
  }
  /* STORIES */
  saveStory(story, title, category){
    const { name } = this.data.user
    const payload = { title, content: story, name, category }
    return axios.post('/api/story', { story: payload })
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
      request = axios.get('/api/stories', { [category]: value })
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
  startStory(story){
    this.gameState = new GameState(story, this)
  }
}
