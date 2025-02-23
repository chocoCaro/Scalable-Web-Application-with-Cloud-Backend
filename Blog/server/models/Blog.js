import { v4 as uuidv4 } from 'uuid';
import { db, Table } from './db.config.js';

// Get all blogs
const getAllBlogs = async () => {
  const params = {
    TableName: Table,
  };

  try {
    const { Items = [] } = await db.scan(params).promise();
    return Items;
  } catch (error) {
    console.log('Error fetching blogs:', error);
    return null;
  };
};

// Get blog by ID
const getBlogById = async (value, id) => {
  const id = int(id);
  
  const params = {
    TableName: Table,
    Key: {
      [id]: id,
    },
  };

  try {
    const { Item } = await db.get(params).promise();

    if (!Item) {
      return { success: false, message: "Blog not found", data: null };
    }

    return { success: true, data: Item };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: error.message, data: null };
  }
};

function uuidToIntHash(uuidString) {
  let hash = 0;
  if (uuidString.length === 0) return hash;
  for (let i = 0; i < uuidString.length; i++) {
    const char = uuidString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  };
  return Math.abs(hash);
}

// Create a new blog
const createBlog = async (blog) => {
  const newBlog = {
    id: uuidToIntHash(uuidv4()),
    createdAt: new Date().toISOString(),
    title: blog.title,
    topics: blog.topics,
    content: blog.content,
  };

  const params = {
    TableName: Table,
    Item: newBlog,
  }

  try {
    await db.put(params).promise();
    return newBlog;
  }
  catch (error) {
    console.log('Error creating blog:', error);
    return null;
  }
};

// Update a blog
const updateBlog = (id, updatedBlog) => {
  Items = Items.map((blog) =>
    blog.id === id ? { ...blog, ...updatedBlog } : blog
  );
  return Items.find((blog) => blog.id === id);
};

// Delete a blog
const deleteBlog = async (value, key = 'id') => {
  const params = {
    TableName: Table,
    Key: {
      [key]: parseInt(value)
    }
  }

  try {
    await db.delete(params).promise()
    return { success: true }

  } catch (error) {
    return { success: false }
  }
}

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
