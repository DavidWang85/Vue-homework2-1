import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'david-frontend';  

//Vue 起手式
const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{},
        }
    },
    methods: {
        checkLogin() {
            //取出token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)davidToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //每次發送請求時都把token加進來
            axios.defaults.headers.common['Authorization'] = token;
            console.log(token);
        
            //新的code，帶headers
            const url = `${site}api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getProducts();
                })
                .catch(err => {
                    console.log(err);
                    window.location = './login.html';
                })
        },
        getProducts() {
            const url = `${site}api/${api_path}/admin/products/all`;
            axios.get(url)
                .then(res =>{
                    this.products = res.data.products;
                    // Object.values(this.products).forEach((item)=>{
                    //     console.log(item);
                    // })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.checkLogin();
    },
});
app.mount('#app');