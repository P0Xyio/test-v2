export interface Configuration {
  nodeEnv: string;
  jwtSecret: string;
  dbConnection: {
    user: string;
    password: string;
    database: string;
    host: string;
    port: number;
  };
}

export default (): Configuration => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  dbConnection: {
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgrespassword',
    database: process.env.DATABASE_NAME || 'backend',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
