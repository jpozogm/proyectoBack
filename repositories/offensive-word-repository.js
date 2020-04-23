
const OffensiveWordSchema = require ('../models/offensiveWords');

module.exports = class OffensiveWordRepository {

    async saveOffensiveWord(offWord) {

        if (typeof offWord.word != "string" || typeof offWord.level != "number") {
            res.sendStatus(400);
        } else {
            //create object
            const newOffensiveWord = new OffensiveWordSchema ({
                word: offWord.word,
                level: offWord.level,
            });
    
            //save resource
            return await newOffensiveWord.save(); 
        }
    };

    async getOffensiveWords() {
        const allOffensiveWords = await OffensiveWordSchema.find({});
        return allOffensiveWords; 
    }

    async getOffensiveWord(req, res) {
        const id= req.params.id;
        const ow= await OffensiveWordSchema.findById(id); 
    
        if(!ow) {
            res.sendStatus(404);
        } else {
            res.json(ow); 
        }
    };

    async updateOffensiveWord(req, res) {
        const id = req.params.id;
    const ow= await OffensiveWordSchema.findById(id); 

    if(!ow){
        res.sendStatus(404);
    } else {
        const owReq = req.body;


        //validation
        if (typeof owReq.word != "string" || typeof owReq.level != "number") {
            res.sendStatus(404);
        } else {
            //update fields in model

                ow.word = owReq.word;
                ow.level = owReq.level;
            
            //upgrate resource
            let offensiveWordSave = await ow.save() 

            //return update resource
            res.json(offensiveWordSave);
        }
    }
    };
    
    async deleteOffensiveWord(req, res) {
        const id = req.params.id;
        const ow = await OffensiveWordSchema.findById(id); 

        if(!ow) {
            res.sendStatus(404);
        } else {
            const OffensiveWordDelete = await OffensiveWordSchema.findByIdAndDelete(id); 
            res.json(OffensiveWordDelete); 
        }
    }
}