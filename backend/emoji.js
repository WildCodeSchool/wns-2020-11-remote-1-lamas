const emojis = 
[
  {
      id:1,
      counter: 0,
  },
  {
    id:2,
    counter: 0,
},
{
    id:3,
    counter: 0,
},
{
    id:4,
    counter: 0,
},
{
    id:5,
    counter: 0,
},
];

const incrementEmojiCounter = (idEmoji) => {
    const index = emojis.indexOf(emoji => emoji.id === idEmoji)

    emojis[index].counter++
  
    return emojis[index]
};

module.exports = {
    incrementEmojiCounter
}