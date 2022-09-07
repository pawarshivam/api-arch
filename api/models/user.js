const libs = global.absolute('api/libs');

/* ================================================ */
const UserSchema = new libs.mongoose.Schema({
  org: {
    type: libs.mongoose.Schema.Types.ObjectId,
    ref: 'Org',
    required: true,
    auto: true,
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

  password: {
    type: String,
    requried: true,
  },

  session: {
    type: libs.mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
    minlength: 24.0,
    maxlength: 24.0,
    trim: true,
  },
}, {
  timestamps: true,
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
// Compile model from the schema
module.exports = libs.mongoose.model('User', UserSchema);
