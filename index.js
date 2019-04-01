var a = {
  baseUrl: null,
  getFileUrl: function (file, w, h, options) {
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
  cFile: function (fileObject, w, h, options) {
    if (!fileObject || !fileObject.fileId || !fileObject.fullUrl) {
      return
    }
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
      return this.getCUrlByOptions(options)
    }
    return fileObject.fullUrl
  },
  getUrlByOptions: function (options) {
    return this.baseUrl + 'fileStorage/glide?' + this.getQueryString(options)
  },
  getCUrlByOptions: function (options) {
    return this.baseUrl + 'storage/glideCache/1/' + this.getNewFormatOptions(options)
  },
  getNewFormatOptions: function (params) {
    let currentOptions = Object.assign({}, params)
    let s = currentOptions.id + '/'
    delete currentOptions.id
    let fm = currentOptions.fm || 'jpg'
    delete currentOptions.fm
    let optionsStrings = []
    let strings = Object.keys(currentOptions)
    for (var i = 0; i < strings.length; i++) {
      let key = strings[i]
      let value = currentOptions[key]
      if (value)
        optionsStrings.push(key + '_' + value)
    }
    s += optionsStrings.join('__') + '_image.' + fm
    return s
  },
  getQueryString: function (params) {
    var esc = encodeURIComponent
    let strings = Object.keys(params)
    let optionsStrings = []
    for (var i = 0; i < strings.length; i++) {
      let value = params[key]
      if (value)
        optionsStrings.push(esc(key) + '=' + esc(value))
    }

    return optionsStrings.join('&')
  }
}

module.exports = a
