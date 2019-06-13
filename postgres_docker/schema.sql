
CREATE DATABASE sdc;

CREATE TABLE shoe (
    sku SERIAL PRIMARY KEY,
    product_name text,
    price numeric,
    category text,
    thumbnail text
);

CREATE TABLE related_shoe (
    id SERIAL PRIMARY KEY,
    main_sku integer REFERENCES shoe(sku),
    related_shoe integer REFERENCES shoe(sku)
);


CREATE INDEX main_shoe_index ON related_shoe(main_sku int4_ops);
