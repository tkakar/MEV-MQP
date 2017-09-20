## Create postgres database faers
```bash
postgres createdb faers postgres

```

## Create schema
```bash
psql faers < create-tables.sql

```

## Create indices

```bash
psql faers < create-indices.sql
```

## Check schema

```bash
psql faers
>>>\dt
>>>\d demo
```