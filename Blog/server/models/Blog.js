import { v4 } from 'uuid';
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
  }
};

// Get blog by ID
const getBlogById = async (id) => {
  const params = {
    TableName: Table,
    Key: {
      id: id,
    },
  };

  try {
    const { Item } = await db.get(params).promise();
    return Item;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return;
  }
};

function uuidToIntHash(uuidString) {
  let hash = 0;
  if (uuidString.length === 0) return hash;
  for (let i = 0; i < uuidString.length; i++) {
    const char = uuidString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Create a new blog
const createBlog = async (blog) => {
  const newBlog = {
    id: uuidToIntHash(v4()),
    createdAt: new Date().toISOString(),
    title: blog.title,
    topics: blog.topics,
    content: blog.content,
  };

  const params = {
    TableName: Table,
    Item: newBlog,
  };

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
const updateBlog = async (id, updatedBlog) => {
  const blog = await getBlogById(id);

  const newBlog = {
    id: id,
    createdAt: blog.createdAt,
    title: updatedBlog.title,
    topics: blog.topics,
    content: updatedBlog.content,
  };

  const params = {
    TableName: Table,
    Item: newBlog,
  };

  try {
    await db.put(params).promise();
    return newBlog;
  }
  catch (error) {
    console.log('Error updating blog:', error);
    return null;
  }
};

// Delete a blog
const deleteBlog = async (id) => {
  const params = {
    TableName: Table,
    Key: {
      id: id,
    }
  };

  try {
    await db.delete(params).promise();
  } catch (error) {
    console.log('Error deleting blog:', error);
  }

  return;
}

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
