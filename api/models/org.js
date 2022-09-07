const libs = global.absolute('api/libs');

/* ================================================ */
const OrgSchema = new libs.mongoose.Schema({
  admins: [{
    type: libs.mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],

  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 300,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },

  website: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    match: /^\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },

  phone: {
    country: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 5,
      trim: true,
      match: /^\d+$/,
    },

    number: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      trim: true,
      match: /^\d+$/,
    },
  },

  whatsapp: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
// Compile model from the schema
module.exports = libs.mongoose.model('Org', OrgSchema);
