'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() { return false },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })

  const howsItGoing = client.createStep({
    satisfied() { return false },

    prompt() {
      client.addResponse('hows_it_going')
      client.done()
    }
  })

  const goodbye = client.createStep({
    satisfied() { return false },

    prompt() {
      client.addResponse('goodbye')
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      'greeting': 'handleGreeting',
      'goodbye': 'handleGoodbye',
      'howsItGoing': 'handleHowsItGoing',
    },
    streams: {
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
      handleGreeting: sayHello,
      handleGoodbye: goodbye,
      handleHowsItGoing: howsItGoing,
    },
  })
}
