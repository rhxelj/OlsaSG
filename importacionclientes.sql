/*Default collation : latin1_swedish_ci
/*Default characterset : latin1
/*ingresar en mysql --local-infile -u root -p*/
/*load data local infile '/home/sandra/.dosemu/drives/c/OLS/data/clientes.csv' replace into table pruebas.ClienDOSorg CHARACTER SET utf8mb4 FIELD
S TERMINATED BY ';';
*/
/*show variables like "secure_file_priv";*/
/*cp /home/sandra/.dosemu/drives/c/OLS/data/clientes.csv /var/lib/mysql-files/.*/

/*lo que funciono es : 
SET GLOBAL local_infile=1;
load data infile '/var/lib/mysql-files/clientes.csv' into table BasesGenerales.ClientesDOS  FIELDS TERMINATED BY ';';*/


SET GLOBAL local_infile=1;
/*show variables like "local_infile";*/
load data local infile '/home/sandra/.dosemu/drives/c/OLS/data/clientes.csv' into table pruebas.clientes  FIELDS TERMINATED BY ';';
load data local infile '/home/sandra/.dosemu/drives/c/OLS/data/clientes.csv' into table pruebas.ClienDOSorg  FIELDS TERMINATED BY ';';
load data local infile '/home/sandra/pruebata.csv' into table pruebas.tabla1  FIELDS TERMINATED BY ';';
load data local infile '/home/sandra/.dosemu/drives/c/OLS/data/clientes.csv' into table pruebas.clientes  FIELDS TERMINATED BY ';';