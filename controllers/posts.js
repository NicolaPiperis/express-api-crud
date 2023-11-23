const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// libreria per automatizzare lo slug basandosi sul title
const slugify = require("slugify");
function generateSlug(title) {
    return slugify(title, { replacement: '-', lower: true });
  }

async function store (req, res) {
    const postData = req.body;
    const slug = generateSlug(postData.title);
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
    const data = await prisma.post.findMany();
    res.json(data);
    
}

async function show (req, res) {
    const dataBySlug = await prisma.post.findUnique({
        where: {
          slug: req.params.slug  
        }
    })
    res.json(dataBySlug);
    
}

async function showByFilter (req, res) {
    const publishedData = await prisma.post.findMany({
        where: {
            published: true
        }
    })
    res.json(publishedData);
    
// COMPLETARE CON RICERCA SU FILTRO
}

async function update(req, res) {
  const slug = req.params.slug;
  const dataInComing = req.body;

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    throw new Error('Not Found 404');
  }

  // Aggiornamento dello slug
  const updatedSlug = generateSlug(dataInComing.title);

  const updatePost = await prisma.post.update({
    data: {
      ...dataInComing,
      slug: updatedSlug,
    },
    where: {
      slug: slug,
    },
  });

  res.json(updatePost);
}


async function destroy (req, res) {
    const deletedData = await prisma.post.delete({
        where: {
            slug: req.params.slug
        }
    })
    res.json(deletedData);
}

module.exports = {
    store,
    index,
    show,
    showByFilter,
    update,
    destroy
}