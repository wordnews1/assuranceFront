#!/bin/sh

ROOT_DIR=./.env

echo "Replacing env constants in constants.js file"
echo "Processing $file ...";

sed -i 's|BACKSERVERURL|'${VUE_APP_BACK_SERVER_URL}'|g' $ROOT_DIR
sed -i 's|VISITSERVERURL|'${VUE_APP_VISIT_SERVER_URL}'|g' $ROOT_DIR
sed -i 's|FRONTSERVERURL|'${VUE_APP_FRONT_SERVER_URL}'|g' $ROOT_DIR
sed -i 's|KEYCLOAKSERVERURL|'${VUE_APP_KEYCLOAK_SERVER_URL}'|g' $ROOT_DIR


sed -i 's|FRONTPORT|'${VUE_APP_FRONT_PORT}'|g' $ROOT_DIR
sed -i 's|BACKPORT|'$gitu{VUE_APP_BACK_PORT}'|g' $ROOT_DIR
sed -i 's|KEYCLOAKPORT|'${VUE_APP_KEYCLOAK_PORT}'|g' $ROOT_DIR
sed -i 's|VISITPORT|'${VUE_APP_VISIT_PORT}'|g' $ROOT_DIR

cat $ROOT_DIR