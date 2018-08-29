const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
<<<<<<< HEAD:api/user/UserModel.js
const ObjectId = mongoose.Schema.Types.ObjectId;
const { checkPasswordStrength, validateEmail, validatePhone, validateLinkedIn, validateGithub } = require("../helpers/Validation");
=======

// Validation

/*
  Email example: test@service.com
*/
const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/*
  Phone Number example: 123-456-7890
*/
// const validatePhone = number => {
//   const re = /^([0-9]{3}-)([0-9]{3}-)([0-9]{4})$/g;
//   return re.test(number);
// };

/* 
  Password Requirements:
    Must be longer than 6 characters
    Must have at least 1 uppercase
    Must have at least 1 lowercase
    Must have at least 1 special character
    Must have at least 1 digit
*/
const checkPasswordStrength = password => {
  const minlength = 6;

  if (password.length < minlength) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
    return false;
  return true;
};

// Checking links on the backend is a waste of processing time and creates unnecessary validation errors

/*
  Linkedin example: linkedin.com/in/test/ (allows some special characters)
*/
// const validateLinkedIn = url => {
//   const re = /^(linkedin\.com\/in\/[\w-!@#$%^&*]+)$/;
//   return re.test(url);
// };

/*
  GitHub example: github.com/test/ (allows some special characters)
*/
// const validateGithub = url => {
//   const re = /^(github\.com\/[\w-!@#$%^&*]+)$/;
//   return re.test(url);
// };
>>>>>>> f9712a4a20682555ebddbbebe7b4d088dc29545f:user/UserModel.js

const User = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      validate: [checkPasswordStrength, "Password Too Weak"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Invalid Email"]
    },
    name: {
      firstname: {
        type: String,
        maxlength: 20,
        required: true,
        default: ""
      },
      middlename: {
        type: String,
        maxlength: 20,
        required: true,
        default: ""
      },
      lastname: {
        type: String,
        maxlength: 20,
        required: true,
        default: ""
      }
    },
    location: String,
    title: [
      {
        type: String
      }
    ],
    phonenumber: {
      type: String
      // validate: [validatePhone, "Invalid Phone Number"]
    },
    links: {
      linkedin: {
        type: String
        // validate: [validateLinkedIn, "Invalid Linkedin"]
      },
      github: {
        type: String
        // validate: [validateGithub, "Invalid GitHub"]
      },
      portfolio: String
    },
    sections: {
      summary: [
        {
          id: ObjectId,
          type: String
        }
      ],
      experience: [
        {
          id: ObjectId,
          title: {
            type: String,
            default: "title"
          },
          company: {
            type: String,
            default: ""
          },
          location: String,
          from: {
            type: String,
            default: ""
          },
          to: String,
          description: String
        }
      ],
      education: [
        {
          id: ObjectId,
          school: {
            type: String,
            default: "school"
          },
          degree: {
            type: String,
            default: ""
          },
          fieldofstudy: {
            type: String,
            default: ""
          },
          from: {
            type: String,
            default: ""
          },
          to: String
        }
      ],
      skills: [
        {
          id: ObjectId,
          type: String
        }
      ]
    },
    membership: {
      type: Boolean,
      default: false
    },
    subscription: String,
    resumes: [{
      type: ObjectId,
      ref: "Resume"
    }]
  },
  { timestamps: true }
);

User.pre("save", function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model("User", User);