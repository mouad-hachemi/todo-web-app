CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(30) NOT NULL,
    username VARCHAR(24) NOT NULL,
    password VARCHAR(80) NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content VARCHAR(255) NOT NULL,
    is_done BOOLEAN NOT NULL DEFAULT FALSE,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);