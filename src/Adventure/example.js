export default [
  {
    id: 0,
    text: 'You are in a room, there is a door to the left and a door to the right.',
    options: [
      {
        key: 0,
        text: 'Take the left door',
        target: 1
      },
      {
        key: 1,
        text: 'Take the right door',
        target: 2
      }
    ]
  },
  {
    id: 1,
    style: 'bold',
    text: 'You are in an empty room.',
    options: [
      {
        key: 0,
        text: 'Leave the room',
        target: 0
      }
    ]
  },
  {
    id: 2,
    style: ['bold', 'green'],
    text: 'You are in a bright green field, you made it!',
    options: [
      {
        key: 0,
        text: 'Quit',
        target: 'EXIT'
      }
    ]
  }
]
