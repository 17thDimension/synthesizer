String.prototype.isNodeKey = () ->
  @length == 1 and @match(/[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]/i)
