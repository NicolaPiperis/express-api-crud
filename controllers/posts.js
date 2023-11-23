const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// libreria per automatizzare lo slug basandosi sul title
const slugify = require("slugify");

async function store (req, res) {
    const postData = req.body;
    const slug = slugify(postData.title, { replecement : "-", lower: true});
    const newPost = await prisma.post.create({
        data:{
            title: postData.title,
            slug: slug,
            image: postData.image,
            content: postData.content,
            published: postData.published
        }
    })
    return res.json(newPost);
}

async function index (req, res) {
    
    
}

async function show (req, res) {
    
}

async function update (req, res) {
    
}

async function destroy (req, res) {
    
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}