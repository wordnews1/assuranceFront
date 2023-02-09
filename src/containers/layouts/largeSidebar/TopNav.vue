<template>
  <div class="main-header">
      <div class="logo">
      <img src="@/assets/images/logo.png" style="width:65px; height: 40px;"alt=""/>
      </div>

    <div @click="sideBarToggle" class="menu-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="d-flex align-items-center">
      <!-- Mega menu -->

      <!-- / Mega menu -->

    </div>

    <div style="margin: auto">
        <h3><span class="badge badge-dark">{{organisationName}}</span></h3>
    </div>

    <div class="header-part-right">
      <!-- Full screen toggle -->
      <i
        class="i-Full-Screen header-icon d-none d-sm-inline-block"
        @click="handleFullScreen"
      ></i>
      <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
      <!-- Grid menu Dropdown -->




      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          text="Dropdown Button"
          class="m-md-2 user col align-self-end"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <img
              src="@/assets/images/faces/1.jpg"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
                <i class="i-Lock-User mr-1"></i> <b> {{firstname}} {{ lastname}} </b>
            </div>
            <a class="dropdown-item">Rôle : {{role}}</a>
            <a class="dropdown-item" @click.prevent="OnPasswordManage">Mot de passe</a>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"
              >Déconnexion</a
            >
          </div>
        </b-dropdown>
      </div>
    </div>
    <search-component
      :isSearchOpen.sync="isSearchOpen"
      @closeSearch="toggleSearch"
    ></search-component>
  </div>

  <!-- header top menu end -->
</template>
<script>
import Util from "@/utils";
import Vue from 'vue';
import Sidebar from "./Sidebar";
import searchComponent from "../common/search";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: {
    Sidebar,
    searchComponent
  },

  data() {
    return {
      isDisplay: true,
      firstname: localStorage.getItem("firstname"),
      organisationName: localStorage.getItem("organisationName"),
      role: localStorage.getItem("roles"),
      lastname: localStorage.getItem("lastname"),
      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false,
    };
  },

  mounted() {
    // document.addEventListener("click", this.closeMegaMenu);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSidebarProperties",
      "changeThemeMode",
      "signOut"
    ]),

    // megaMenuToggle() {
    //   this.isMegaMenuOpen = false;

    //   console.log("work");
    // },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
    OnPasswordManage(){
        Vue.prototype.$keycloak.accountManagement();
    },
    logoutUser() {

        Vue.prototype.$keycloak.logoutFn();
      //this.$router.push("/app/sessions/signIn");
    },

    closeMegaMenu() {
      this.isMegaMenuOpen = false;
      // console.log(this.isMouseOnMegaMenu);
      // if (!this.isMouseOnMegaMenu) {
      //   this.isMegaMenuOpen = !this.isMegaMenuOpen;
      // }
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },

    sideBarToggle(el) {
      if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        isMobile
      ) {
        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      } else if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        this.changeSecondarySidebarProperties();
      } else if (this.getSideBarToggleProperties.isSideNavOpen) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        !this.getSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        // console.log("4");

        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
        // console.log("4");
      }
    }
  }
};
</script>



