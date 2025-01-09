const express = require("express");
const router = express.Router();

// IMPORT MODEL
const Example = require("../../models/example");

// GET ROUTE: Retrieve all examples
router.get("/", async (req, res) => {
  try {
    const result = await Example.findAll(); // EXECUTE MODEL LOGIC
    res.status(200).json({ message: "Examples retrieved", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ROUTE: Retrieve 1 example
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Example.findById(id); // EXECUTE MODEL LOGIC
    res.status(200).json({ message: "Example retrieved", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST ROUTE: Create a new example
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await Example.create(data); // EXECUTE MODEL LOGIC
    res.status(201).json({ message: "Example created", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT ROUTE: Update an example by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Example.update(id, data); // EXECUTE MODEL LOGIC
    res.status(200).json({ message: "Example updated", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ROUTE: Delete an example by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Example.delete(id); // EXECUTE MODEL LOGIC
    res.status(200).json({ message: "Example deleted", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
