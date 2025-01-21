import prisma from "../db"

export const getUpdate = async (req, res) => {
  const product = await prisma.update.findUnique({
    where: {
      id: req.params.id
    },
  });
  res.status(200).json({ data: product });
}
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });
  const updates = products.reduce((allUpdates, product) => { return [...allUpdates, ...product.updates] }, []);
  res.status(200).json({ data: updates });
}
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    }
  });
  if (!product) {
    res.json({ data: [] });
    return;
  }
  const update = await prisma.update.create({
    data: req.body
  });
  res.status(200).json({ data: update });
}
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });
  const updates = products.reduce((allUpdates, product) => { return [...allUpdates, ...product.updates] }, []);
  const match = updates.find(update => update.id === req.params.id);
  if (!match) {
    res.json({ data: [] });
    return;
  }
  const update = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: {
      title: req.body.title,
      // product: { connect: product }
      // productId:req.body.productId,
    }
  });
  res.status(200).json({ data: update });
}

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });
  const updates = products.reduce((allUpdates, product) => { return [...allUpdates, ...product.updates] }, []);
  const match = updates.find(update => update.id === req.params.id);
  if (!match) {
    res.json({ data: [] });
    return;
  }
  const update = await prisma.update.delete({
    where: {
      id: req.params.id,
    }
  });
  res.status(200).json({ data: update });
}
