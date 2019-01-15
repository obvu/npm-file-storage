export default {
  baseUrl: null,
  getFileUrl (file, w, h, options) {
    let id = null
    if (!file) return '/img/placeholders/workspace.png'
    if (file[0] !== null) {
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
  getUrlByOptions (options) {
    return this.baseUrl + 'fileStorage/glide?' + this.getQueryString(options)
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
