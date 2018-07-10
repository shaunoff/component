class AssetsHelper {
  constructor() {
    this.path = ''
  }

  config(path) {
    this.path = path
  }

  image_url(image) {
    return `${this.path}/${image}`
  }
}

export default new AssetsHelper()
