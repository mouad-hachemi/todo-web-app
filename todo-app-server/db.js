import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "dumb-dev",
    database: "todo_app",
    port: 5432,
});

export default pool;
