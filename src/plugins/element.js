import Vue from 'vue'
import Element, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
    Button,
    Input,
    Select,
    Form,
    Table,
    Card,
    FormItem,
    TableColumn,
    Option
} from "element-ui";

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Form)
Vue.use(Table)
Vue.use(Card)
Vue.use(FormItem)
Vue.use(TableColumn)
Vue.use(Option)
Vue.prototype.$message = Message
