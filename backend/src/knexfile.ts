import path from 'path'


module.exports ={ //Knex não aceita o export default
	client: "sqlite3",
	connection: {
		filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite' ) //__dirname retorna o caminho do arquivo que estamos 
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'database', 'migrations' ) //__dirname retorna o caminho do arquivo que estamos 
	},
	seeds: {
		directory: path.resolve(__dirname, 'src', 'database', 'seeds' ) 
	},
	 useNullAsDefault: true
}