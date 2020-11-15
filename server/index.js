require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// ----------routes

app.get('/api/sets', (req, res, next) => {
  const sql = `
    select "setId", "setName", "artistName", "image"
    from "sets"
    join "artists" using ("artistId")
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => console.error(err));
});

app.get('/api/artists', (req, res, next) => {
  const sql = `
    select *
    from "artists"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => console.error(err));
});

app.get('/api/sets/:setName', (req, res, next) => {
  const setName = req.params.setName;
  const setNameLowercase = setName.toLowerCase();

  const sql = `
    select "setId", "setName", "artistName", "image"
    from "sets"
    join "artists" using ("artistId")
    where "setName" = $1
  `;

  const values = [setNameLowercase];

  db.query(sql, values)
    .then(result => {
      if (result.rows[0]) {
        res.status(200).json(result.rows);
      } else {
        next(new ClientError(`cannot find setName ${setName}`, 404));
      }
    })
    .catch(err => next(err));

});

app.get('/api/artists/:artistName', (req, res, next) => {
  const artistName = req.params.artistName;
  const artistNameLowercase = artistName.toLowerCase();

  const sql = `
    select "artistId", "artistName", "image", "setId", "setName"
    from "artists"
    join "sets" using ("artistId")
    where "artistName" = $1
  `;

  const values = [artistNameLowercase];

  db.query(sql, values)
    .then(result => {
      if (result.rows[0]) {
        res.status(200).json(result.rows);
      } else {
        next(
          new ClientError(`cannot find artistName ${artistNameLowercase}`, 404)
        );
      }
    })
    .catch(err => next(err));
});

app.get('/api/accounts/:account', (req, res, next) => {
  const account = req.params.account;
  const accountLowercase = account.toLowerCase();

  const sql = `
    select "artistId", "artistName", "image", "setId", "setName"
    from "artists"
    join "sets" using ("artistId")
    where "artistName" = $1
  `;

  const values = [accountLowercase];

  db.query(sql, values)
    .then(result => {
      if (result.rows[0]) {
        res.status(200).json(result.rows);
      } else {
        next(
          new ClientError(`cannot find artistName ${accountLowercase}`, 404)
        );
      }
    })
    .catch(err => next(err));
});

app.get('/api/artists/:artistName', (req, res, next) => {
  const artistName = req.params.artistName;
  const artistNameLowercase = artistName.toLowerCase();
  const sql = `
    select "artistId", "artistName", "image"
    from "artists"
    where "artistName" = $1
  `;
  const values = [artistNameLowercase];
  db.query(sql, values)
    .then(result => {
      if (result) {
        res.status(200).json(result.rows);
      } else {
        next(
          new ClientError(`cannot find artistName ${artistNameLowercase}`, 404)
        );
      }
    })
    .catch(err => next(err));
});

app.post('/api/saveset', (req, res, next) => {
  const artistId = req.body.artistId;
  const setName = req.body.setName;
  const osc1 = req.body.osc1;
  const waveForm1 = req.body.waveForm1;
  const frq1 = req.body.frq1;
  const lp1 = req.body.lp1;
  const hp1 = req.body.hp1;
  const delay1 = req.body.delay1;
  const reverb1 = req.body.reverb1;
  const distortion1 = req.body.distortion1;
  const gain1 = req.body.gain1;
  const osc2 = req.body.osc2;
  const waveForm2 = req.body.waveForm2;
  const frq2 = req.body.frq2;
  const lp2 = req.body.lp2;
  const hp2 = req.body.hp2;
  const delay2 = req.body.delay2;
  const reverb2 = req.body.reverb2;
  const distortion2 = req.body.distortion2;
  const gain2 = req.body.gain2;
  const output = req.body.output;

  const insert = `
          insert into "sets" ("setName", "artistId", "osc1", "waveForm1", "frq1", "lp1", "hp1", "delay1", "reverb1", "distortion1", "gain1", "osc2", "waveForm2", "frq2", "lp2", "hp2", "delay2", "reverb2", "distortion2", "gain2", "output")
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          returning "setId"
        `;

  const values = [setName, artistId, osc1, waveForm1, frq1, lp1, hp1, delay1, reverb1, distortion1, gain1, osc2, waveForm2, frq2, lp2, hp2, delay2, reverb2, distortion2, gain2, output];

  db.query(insert, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.get('/api/setdata/:setId', (req, res, next) => {
  const setId = parseInt(req.params.setId, 10);
  if (!Number.isInteger(setId) || setId <= 0) {
    res.status(400).json({
      error: '"setId" must be a positive integer'
    });
  }

  const sql = `
    select *
    from "sets"
    join "artists" using ("artistId")
    where "setId" = $1
  `;

  const values = [setId];

  db.query(sql, values)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));

});

// ----------

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
