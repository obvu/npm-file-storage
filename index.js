var a = {
  baseUrl: null,
  getFileUrl (file, w, h, options) {
    let id = null
    if (!file) return '/img/placeholders/workspace.png'
    if (Array.isArray(file) && file[0] !== null) {
      id = file[0]
    }
    if (!id)
      id = file

    options = options || { fit: 'max' }
    options.w = w
    options.h = h
    options.id = id
    return this.getUrlByOptions(options)
  },
  cFile (fileObject, w, h, options) {
    let re = /(?:\.([^.]+))?$/
    let ext = re.exec(fileObject.fullUrl)[1]
    let transformFormats = ['jpg', 'pjpg', 'png', 'jpeg']
    if (transformFormats.indexOf(ext) !== -1) {
      options = options || { fit: 'max' }
      options.w = w
      options.h = h
      options.fm = options.fm || ext
      if (options.fm !== 'jpg' && options.q) {
        delete options.q
      }
      options.id = fileObject.fileId
      return this.getCUrlByOptions(options);
    }
    return fileObject.fullUrl
  },
  getUrlByOptions (options) {
    return this.baseUrl + 'fileStorage/glide?' + this.getQueryString(options)
  },
  getCUrlByOptions (options) {
    return this.baseUrl + 'storage/glideCache/1/' + this.getNewFormatOptions(options)
  },
  getNewFormatOptions (params) {
    let currentOptions = { ...params }
    let s = currentOptions.id + '/'
    delete currentOptions.id
    let fm = currentOptions.fm || 'jpg'
    delete currentOptions.fm
    let optionsStrings = []
    Object.keys(currentOptions)
      .filter(key => !!currentOptions[key])
      .forEach(key => {
        let value = currentOptions[key]
        optionsStrings.push(key + '_' + value)
      })
    s += optionsStrings.join('__') + '_image.' + fm
    return s
  },
  getQueryString (params) {
    var esc = encodeURIComponent
    var query = Object.keys(params)
      .filter(v => !!params[v])
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&')

    return query
  }
}

module.exports = a
