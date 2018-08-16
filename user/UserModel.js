const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Validation
const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const validatePhone = number => {
  const re = /^([0-9]{3}-)([0-9]{3}-)([0-9]{4})$/g;
  return re.test(number);
}

/* 
  Password Requirements:
    Must be longer than 6 characters
    Must have at least 1 uppercase
    Must have at least 1 lowercase
    Must have at least 1 special character
*/
const checkPasswordStrength = password => {
  const minlength = 6;

  if (password.length < minlength) return false; 
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/)) return false;
  return true;
}

const validateLinkedIn = url => {
  const re = /^(https?:\/\/[w]{3}\.linkedin\.com\/in\/[\w-?]+\/)$/;
  return re.test(url);
}

const validateGithub = url => {
  const re = /^(https?\:\/\/github\.com\/[\w\d-!+@#$]+)$/;
  return re.test(url);
}



const User = new mongoose.Schema(
  {
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
        maxlength: 20
      },
      middlename: {
        type: String,
        maxlength: 20
      },
      lastname: {
        type: String,
        maxlength: 20
      }
    },
    phonenumber: {
      type: String,
      validate: [validatePhone, "Invalid Phone Number"]
    },
    links: {
      linkedin: {
        type: String,
        validate: [validateLinkedIn, "Invalid Linkedin"]
      },
      github: {
        type: String,
        validate: [validateGithub, "Invalid github"]
      },
      portfolio: String
    },
    sections: {
      summary: [
        {
          type: String
        }
      ],
      experience: [
        {
          title: {
            type: String,
            required: true
          },
          company: {
            type: String,
            required: true
          },
          location: String,
          from: {
            type: String,
            required: true
          },
          to: String,
          description: String
        }
      ],
      education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: String,
            required: true
          },
          to: String,
          current: {
            type: Boolean,
            default: false
          }
        }
      ],
      skills: [
        {
          type: String
        }
      ]
    }
  },
  { timestamps: true }
);

User.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess) {
  return bcrypt.compareSync(passwordGuess, this.password);
};

module.exports = mongoose.model("User", User);
