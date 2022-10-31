require("dotenv").config({ path: "../.env.local" });

module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: process.env.PSQL_DATABASE,
			user: process.env.PSQL_USER,
			password: process.env.PSQL_PASSWORD,
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
	production: {
		client: "postgresql",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
};
