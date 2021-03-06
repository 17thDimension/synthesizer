do (window) ->
  WORKER_PATH = 'components/Recorderjs/recorderWorker.js'

  Recorder = (source, cfg) ->
    console.log(source)
    config = cfg or {}
    bufferLen = config.bufferLen or 4096
    numChannels = config.numChannels or 2
    @context = source.context
    @node = (@context.createScriptProcessor or @context.createJavaScriptNode).call(@context, bufferLen, numChannels, numChannels)
    worker = new Worker(config.workerPath or WORKER_PATH)
    worker.postMessage
      command: 'init'
      config:
        sampleRate: @context.sampleRate
        numChannels: numChannels
    recording = false
    currCallback = undefined

    @node.onaudioprocess = (e) ->
      if !recording
        return
      buffer = []
      channel = 0
      while channel < numChannels
        buffer.push e.inputBuffer.getChannelData(channel)
        channel++
      worker.postMessage
        command: 'record'
        buffer: buffer
      return

    @configure = (cfg) ->
      for prop of cfg
        if cfg.hasOwnProperty(prop)
          config[prop] = cfg[prop]
      return

    @record = ->
      recording = true
      return

    @stop = ->
      recording = false
      return

    @clear = ->
      worker.postMessage command: 'clear'
      return

    @getBuffer = (cb) ->
      currCallback = cb or config.callback
      worker.postMessage command: 'getBuffer'
      return

    @exportWAV = (cb, type) ->
      currCallback = cb or config.callback
      type = type or config.type or 'audio/wav'
      if !currCallback
        throw new Error('Callback not set')
      worker.postMessage
        command: 'exportWAV'
        type: type
      return
    @destroy = ()->
      worker.terminate()
      console.log(worker)
      delete @
    worker.onmessage = (e) ->
      blob = e.data
      currCallback blob
      return

    source.connect @node
    @node.connect @context.destination
    #this should not be necessary
    return

  Recorder.forceDownload = (blob, filename) ->
    url = (window.URL or window.webkitURL).createObjectURL(blob)
    link = window.document.createElement('a')
    link.href = url
    link.download = filename or 'output.wav'
    click = document.createEvent('Event')
    click.initEvent 'click', true, true
    link.dispatchEvent click
    return

  window.Recorder = Recorder
  return

# ---
# generated by js2coffee 2.0.4
