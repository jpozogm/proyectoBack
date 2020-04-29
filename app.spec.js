const supertest = require ('supertest');
const app = require('./app');
const request = supertest(app)


describe('System test', () =>{

    it('Testing POST', async ()=>{

        const admintoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7InJvbGUiOiJhZG1pbiIsInVzZXIiOiJTYWdhbiJ9LCJpYXQiOjE1ODgxNzQ3MDF9.WYBW0oTi_ffRiEP2hFwgE-cyeWMvCn3_wNFw_K5rg8o"

        const postResponse = await request.post('/posts')
            .set('Authorization', 'Bearer ' + admintoken)
            .set('Accept', 'application/json')
            .send(
                {
                    "postTittle": "Cosmos",
                    "postComments": [],
                    "postAuthorName": "Carl Sagan",
                    "postAuthorNickName": "sagan",
                    "postContent": "Para hacer una tarta de manzana primero tienes que crear un universo."
                })
            .expect(200)
        expect(postResponse.body.postTittle).toBe("Cosmos");
 
        const getResponse = await request.get('/posts').expect(200) 
        expect(getResponse.body.length).toBeGreaterThan(0);


        const postId = postResponse.body._id;
        const getIDResponse = await request.get(`/posts/${postId}`).expect(200)
        expect(getIDResponse.body.postTittle).toBe("Cosmos");


        const putResponse = await request.put(`/posts/${postId}`)
            .set('Authorization', 'Bearer ' + admintoken)
            .set('Accept', 'application/json')
            .send(
                {
                  "postTittle": "Humans",
                   "postComments": [],
                  "postAuthorName": "Carl Sagan",
                   "postAuthorNickName": "sagan",
                   "postContent": "Para hacer una tarta de manzana primero tienes que crear un universo."
               })
            .expect(200)
        expect(putResponse.body.postTittle).toBe("Humans");

        const deleteResponse = await request.delete(`/posts/${postId}`)
            .set('Authorization', 'Bearer ' + admintoken)
            .set('Accept', 'application/json')
            .expect(200)
        expect(deleteResponse).not.toBe(null);

        const getIDResponse2 = await request.get(`/posts/${postId}`).expect(200)
        expect(getIDResponse2.body.postTittle).toBe("Humans");
    })
})