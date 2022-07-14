const Pool = require("pg").Pool;
const pool = new Pool({
  user: "practiceadmin@practicephoenixazure",
  host: "practicephoenixazure.postgres.database.azure.com",
  database: "easy_scooter",
  password: "Respons11",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query(
    "SELECT * FROM scooter_maintenance ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM scooter_maintenance WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { model } = request.body;

  pool.query(
    "INSERT INTO scooter_maintenance (model) VALUES ($1)",
    [model],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { identifiant, modele } = request.body;

  pool.query(
    "UPDATE scooter_maintenance SET identifiant = $1, modele = $2 WHERE id = $3",
    [identifiant, modele, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM scooter_maintenance WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
