import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// // import ChartLine from '@/views/ChartLine'
// import Admin from '@/components/Admin'
import GroupsList from '@/components/groups/groups-list'
import GroupsForm from '@/components/groups/groups-form'
import GroupsMem from '@/components/groups/groups-members'
import GroupsMemAdd from '@/components/groups/groups-members-add'
import UsersForm from '@/components/users/users-form'
import UsersList from '@/components/users/users-list'

Vue.use(Router)

export default new Router({
  routes: [{
  // {
  //   path: '/',
  //   name: 'App',
  //   component: App,
  //   redirect: '/app/groups-list',
  //   children: [
  //     {
  //       path: '/app/groups-list',
  //       component: GroupsList
  //     }
  //   ]
  // },
  // {
    path: '/groups-list',
    name: 'groups-list',
    component: GroupsList
  },
  {
    path: '/groups-form',
    name: 'groups-form',
    component: GroupsForm
  },
  {
    path: '/groups-members',
    name: 'groups-members',
    component: GroupsMem
  },
  {
    path: '/groups-members-add',
    name: 'groups-members-add',
    component: GroupsMemAdd
  },
  {
    path: '/users-form',
    name: 'users-form',
    component: UsersForm
  },
  {
    path: '/users-list',
    name: 'users-list',
    component: UsersList
  }
  ]
})
