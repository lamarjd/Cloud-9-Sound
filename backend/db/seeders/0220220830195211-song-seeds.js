'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Song} = require('../models'), options


const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "Lofi Study",
    description: "Jazzy, easy, laid back",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664730021/Cloud-9/pexels-photo-2337491_y7qnmy.jpg"
  },
  {
    albumId: 2,
    userId: 2,
    title: "Stomping Rock",
    description: "Aggressive, rock, energetic",
    url: "https://cdn.pixabay.com/download/audio/2022/05/17/audio_407815a564.mp3?filename=stomping-rock-four-shots-111444.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664729878/Cloud-9/pexels-photo-2170729_iwihoe.jpg"
  },
  {
    albumId: 3,
    userId: 3,
    title: "Whip",
    description: "Beats, energetic, upbeat",
    url: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_67bcf729cf.mp3?filename=whip-110235.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664580343/Cloud-9/cld-sample-3.jpg"
  },  
  {
    albumId: 1,
    userId: 1,
    title: "Loneliness of the Winner",
    description: "Ambient, Cinematic, Trailer Music",
    url: "https://cdn.pixabay.com/download/audio/2022/04/30/audio_3c7238ff32.mp3?filename=loneliness-of-the-winner-110416.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664730141/Cloud-9/pexels-photo-4014053_yzrlhf.jpg"
  },  
  {
    albumId: 1,
    userId: 1,
    title: "Sedative",
    description: "Sedative Music, Acoustic, Calm",
    url: "https://cdn.pixabay.com/download/audio/2022/04/27/audio_30ff2fdf22.mp3?filename=sedative-110241.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664730080/Cloud-9/pexels-photo-10685137_fdyib6.jpg"
  }, 
  {
    albumId: 2,
    userId: 2,
    title: "Price of Freedom",
    description: "Adventures, Battle, Cinematic",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_b195486a22.mp3?filename=price-of-freedom-33106.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664730090/Cloud-9/pexels-photo-2792631_cmjvak.jpg"
  },  
  {
    albumId: 1,
    userId: 1,
    title: "Into the Night",
    description: "NY Drill, Rap, Beats",
    url: "https://cdn.pixabay.com/download/audio/2022/02/15/audio_1e79dbf2b9.mp3?filename=into-the-night-20928.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664730007/Cloud-9/pexels-photo-12159330_gobpei.jpg"
  },  
  {
    albumId: 1,
    userId: 1,
    title: "Trailer Sport Stylish",
    description: "Aggressive, Energy, Extreme Sports",
    url: "https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=trailer-sport-stylish-16073.mp3",
    imageUrl: "https://res.cloudinary.com/dncypdqkb/image/upload/v1664729927/Cloud-9/pexels-photo-1616470_hey0ro.jpg"
  },
]


module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Songs', songs, options)
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Songs', songs, options)
  },
  // songs
};
