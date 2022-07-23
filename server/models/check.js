const imageSchema = new Schema({
    url: {type:String},
    text: {type:String}
});

const imagesSchema = new Schema({
    images : [imageSchema]
});

// const postSchema = new Schema({
//     imagePost: [imagesSchema]
// });


const AdminSchema = mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    businessName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    businessImg: {
      type: String
    }, 
	adminPosts :[postSchema]
  });