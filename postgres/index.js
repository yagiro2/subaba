const { Client } = require('pg')

const client = new Client({
    /**
     * DATABASE_URL
    *   local: found on ~/.bash_profile
    *   production: provided by heroku
     */
    connectionString: process.env.DATABASE_URL,

    /**
     * ssl config is required by heroku
     * https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
     * */
    ssl: {
        rejectUnauthorized: false
    }
})

async function fetchQuotes() {
    try {
        await client.connect()
    }
    catch (connErr) {
        console.error('[DB] failed to CONNECT')
        console.error(connErr)
        await client.end()
        throw new Error('Failed to connect to DB')
    }

    let res;
    try {
        res = await client.query('select * from quotes;')
    }
    catch (queryErr) {
        console.error('[DB] failed to QUERY for QUOTES')
        console.error(queryErr)
        throw queryErr
    }

    try {
        await client.end()
    }
    catch(err) {
        console.error('failed to CLOSE connection')
        console.error(err)
        throw new Error('Faild to close DB connection')
    }

    const quotes = res ? res.rows.map(row => row.value) : []
    return quotes
}

module.exports = {
    fetchQuotes,
}
