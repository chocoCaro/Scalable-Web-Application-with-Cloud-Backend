import { Router } from 'express';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/BlogController.js';

const router = Router();

// GET /api/blogs - Get all blogs
router.get('/', getBlogs);

// GET /api/blogs/:id - Get a single blog
router.get('/:id', getBlog);

// POST /api/blogs - Create a new blog
router.post('/', createBlog);

// PUT /api/blogs/:id - Update a blog
router.put('/:id', updateBlog);

// DELETE /api/blogs/:id - Delete a blog
router.delete('/:id', deleteBlog);

export default router;
