FROM postgres:latest
RUN mkdir /src/
WORKDIR /src/
COPY schema.sql .
CMD createdb -U postgres sdc && psql sdc postgres -f 'schema.sql'
EXPOSE 5432:5432

