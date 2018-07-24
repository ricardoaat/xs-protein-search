<template>
  <v-app>
    <v-navigation-drawer
      persistent
      width="200"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-flex
        text-md-center
      >
        &copy;2018 — <strong>Ricardo</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: 'Home',
          path: '/'
        },
        {
          icon: 'low_priority',
          title: 'Test',
          path: '/test'
        }
      ],
      miniVariant: true,
      right: false,
      rightDrawer: false,
      title: 'xs-protein-search'
    }
  },
  components: {
    Home,
    HelloWorld
  },
  temp_proteins: [],
  name: 'App'
}
</script>