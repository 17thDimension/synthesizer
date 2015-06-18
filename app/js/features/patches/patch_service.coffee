###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "PatchService", ->

  # Might use a resource here that returns a JSON array

  # Some fake testing data
  patches = [
    {
      id: 0
      title: "Cats"
      info: "Cat sample patch"
    }
    {
      id: 1
      title: "Dogs"
      info: "Real Doggy barks"
    }
    {
      id: 2
      title: "Turtles"
      info: "Turtle sound patch"
    }
    {
      id: 3
      title: "Sharks"
      info: "Cat sample patch"
    }
  ]
  all: ->
    patches

  get: (patchId) ->

    # Simple index lookup
    patches[patchId]
