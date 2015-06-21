###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "ShiftService",(StateService,GainService,RecordService) ->
  shifted = false
  isShifted:() ->
    shifted
  shift: () ->
    GainService.mute()
    shifted= yes
  unShift: () ->
    GainService.unMute()
    shifted= no

  toggleShift: (o) ->
    if shifted
      unShift()
    else
      shift()
