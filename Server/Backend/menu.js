import { Router } from 'express';
const router = Router();
//import { sql, poolPromise } from '../Backend/routes/db.js';
import db from '../Backend/db.js'


router.get('/data', async (req, res) => {
  debugger;
  try {
    // await db.sql.connect(db.config);
    // const result = await db.sql.query('SELECT * FROM dbo.Items');
    const pool = await db.poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Items');
    res.json({ message: 'Data fetched successfully!', data: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
    debugger;
  const { name, price, description } = req.body;
  try {
    const pool = await db.poolPromise;
    await pool.request()
      .input('name', db.sql.VarChar, name)
      .input('price', db.sql.Int, price)
      .input('description', db.sql.VarChar, description)
      .query('INSERT INTO dbo.Items (Name, Price, Description) VALUES (@name, @price, @description)');
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
