## Instalar todos los paquetes mediante el comando

    - npm install -y

## Luego de ello se hacer pull a la base de datos:

    - npx prisma db pull

## Para migrar el codigo hecho el archivo prisma.schema a codigo sql se debe ingresar el siguiente comando:

    - npx prisma migrate dev

## Por ultimo ejecutamos el siguiente comando solo para asegurar inicializar la informacion por defecto en caso de no haber informacion alguna en la base de datos.

    - npx prisma db seed

## Y hacemos push de la informacion

    - npx prisma db push
