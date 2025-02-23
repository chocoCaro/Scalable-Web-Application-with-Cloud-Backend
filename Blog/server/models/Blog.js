import { v4 as uuidv4 } from 'uuid';
import { db, Table } from './db.config.js';

// Get all blogs
const getAllBlogs = async()=>{
  const params = {
      TableName: Table
  }

  try{
      const { Items = [] } = await db.scan(params).promise()
      return { success: true, data: Items }

  } catch(error){
      return { success: false, data: null }
  }

}

// Get blog by ID
const getBlogById = async (value, key = 'id') => {
  const parsedValue = isNaN(value) ? value : parseInt(value); // Keep string if not a number

  const params = {
    TableName: Table,
    Key: {
      [key]: parsedValue,
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

// Create a new blog
const createBlog = async (blog) => {
  const newBlog = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...blog,
  };

  const params = {
      TableName: Table,
      Item: newBlog
  }

  try{
      await db.put(params).promise()
      return { success: true }
  }
  catch(error){
      return { success: false }
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
const deleteBlog = async(value, key = 'id' ) => { 
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
      return{ success: false }
  }
}

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
