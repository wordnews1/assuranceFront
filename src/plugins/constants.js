

/*const resource_url = "http://141.95.103.210:8086/api/v1/";
const resource_urls = "http://141.95.103.210:8087/api/v1/";
const resource_urs = "http://141.95.103.210:8088";
const resource_home = "http://141.95.103.210:8088";

const resource_redirect = "http://141.95.103.210:8090";
const resource_url_auth = "http://141.95.103.210:8090/auth/";
const resource_url_users = "http://141.95.103.210:8090/auth/admin/master/console/#/realms/mtckeycloak/users";



export default {
    resource_url_users,
    resource_home,
    resource_url,
    resource_urls,
    resource_url_auth,
    resource_redirect,
    resource_urs

}*/


const front_server_ip = process.env.VUE_APP_FRONT_SERVER_URL;
const back_server_ip = process.env.VUE_APP_BACK_SERVER_URL;
const visit_server_ip = process.env.VUE_APP_VISIT_SERVER_URL;
const accident_server_ip = process.env.VUE_APP_ACCIDENT_SERVER_URL;
const keycloak_server_ip = process.env.VUE_APP_KEYCLOAK_SERVER_URL;


const back_port = process.env.VUE_APP_BACK_PORT;
const accident_port = process.env.VUE_APP_ACCIDENT_PORT;
const front_port =  process.env.VUE_APP_FRONT_PORT;
const visit_port =  process.env.VUE_APP_VISIT_PORT;
const keycloak_port =  process.env.VUE_APP_KEYCLOAK_PORT;



const rest_back_end_url = "http://"+back_server_ip+":"+ back_port +"/api/v1/";
const accident_end_url = "http://"+accident_server_ip+":"+ accident_port +"/api/v1/";
const back_end_url = "http://"+back_server_ip+":"+ back_port+"/api/v1/";
const back_end_uri = "http://"+back_server_ip+":"+ back_port+"/";
const front_end_url = "http://"+front_server_ip+":"+ front_port;
const visit_end_url = "http://"+visit_server_ip+":"+ visit_port+"/api/v1/";
const visit_end_url_no_api = "http://"+visit_server_ip+":"+ visit_port;

const resource_redirect = "http://"+front_server_ip+":"+ front_port;
const keycloak_auth = "http://"+keycloak_server_ip+":"+ keycloak_port +"/auth/";
const users_url = keycloak_auth + "admin/master/console/#/realms/mtckeycloak/users";


export default {
    rest_back_end_url,
    back_end_url,
    front_end_url,
    keycloak_auth,
    resource_redirect,
    visit_end_url,
    users_url,
    visit_end_url_no_api,
    accident_end_url,
    back_end_uri
}