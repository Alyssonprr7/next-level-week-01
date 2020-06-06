import knex from 'knex';
import path from 'path'; //Lib nativa do node para questoes de path


const connection = knex ({
	client: "sqlite3",
	connection: {
		filename: path.resolve(__dirname, 'database.sqlite' ) //__dirname retorna o caminho do arquivo que estamos 
	},
	useNullAsDefault:true
});

export default connection;