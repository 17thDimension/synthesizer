###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "RecordService",() ->
  startRecording: (o) ->
    console.log('start')
  stopRecording: (o) ->
    console.log('stop')
