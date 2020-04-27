const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const OffensiveWordSchema = Schema({

    word: {
        type: String,
    },
        
    level: {
        type: Number,
        min:1,
        max:5,
        required: true,
    }, 
},
{
    timestamps: true //es como el date now
}
);

module.exports = mongoose.model("offensivewords", OffensiveWordSchema);

