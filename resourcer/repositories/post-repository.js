
const PostSchema = require ('../../models/post');

module.exports = class PostRepository {

    async savePost(post) {
        try {
                const newPost = new PostSchema ({
                    postAuthorName: post.postAuthorName,
                    postAuthorNickName: post.postAuthorNickName,
                    postTittle: post.postTittle,
                    postContent: post.postContent,
                    user: post.user,
                });
        
                //save resource
                await newPost.save(); 
        
                //Return new resource
                return newPost; 

        } catch (err) {
            console.log(err.message)
            return err.message
        }
    };

    async getPosts() {
        try{
            const allPosts = await PostSchema.find({}).populate('postComments').select({__v:0})
            return allPosts; 
        } catch(err) {
            console.log(err);
        }
    }

    async getPost(id) {
        try {
        return await PostSchema.findById(id).populate('postComments'); 
        } catch (err){
            console.log(err);
            return err.message;
        }
    };

    async updatePost(id, poReq, getUserById, getPostById) {

        const postId = getPostById.user;
        const userId = getUserById.id;
        const userRole = getUserById.role

        try {

            if(postId == userId || userRole === "admin") {

                const po= await PostSchema.findById(id); 

                    po.postAuthorName = poReq.postAuthorName;
                    po.postAuthorNickName = poReq.postAuthorNickName;
                    po.postTittle = poReq.postTittle;
                    po.postContent = poReq.postContent;
                
                //upgrate resource
                let postSave = await po.save() 

                //return update resource
                return postSave;
            } else {
                return "El usuario logado no tiene estos derechos";
            }
        } catch (err){
            console.log(err);
            return err.message;
        }
    };
    
    async deletePost(id) {
        try {
            const po = await PostSchema.findById(id); 
            const PostDelete = await PostSchema.findByIdAndDelete(id); 
            return PostDelete; 
        } catch (err){
            console.log(err);
            return err.message;
        }
    }

}