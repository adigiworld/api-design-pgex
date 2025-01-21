import prisma from "../db"

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });
  res.status(200).json({ data: user.products });
}
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      id, belongsToId: req.user.id
    }
  });
  res.status(200).json({ data: product });
}
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    });
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
}
export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    },
    data: {
      name: req.body.name
    }
  });
  res.status(200).json({ data: product });
}

export const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  });
  res.status(200).json({ data: product });
}
