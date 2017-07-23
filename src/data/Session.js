export default class Session {
  constructor(){
    this.data = {
      user: null
    }
  }
  isAuthenticated(){
    return !!this.data.user
  }
}
