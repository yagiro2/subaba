const { Pool } = require('pg')

/**
 * ssl config is required by heroku
 * https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
 * */
const sslConfig = process.env.NODE_ENV !== 'production'
    ? undefined /** local */    
    : {  /** heroku */
        rejectUnauthorized: false
    };

const pool = new Pool({
    /**
     * DATABASE_URL
    *   local: found on ~/.bash_profile
    *   production: provided by heroku
     */
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfig,
})

async function fetchQuotes() {
    let res;
    try {
        res = await pool.query('select * from quotes;')
    }
    catch (queryErr) {
        console.error('[DB] failed to QUERY for QUOTES')
        console.error(queryErr)
        throw queryErr
    }

    const quotes = res ? res.rows.map(row => row.value) : []
    return quotes
}

module.exports = {
    fetchQuotes,
}
