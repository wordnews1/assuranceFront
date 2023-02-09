<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
            <li
                    @mouseenter="toggleSubMenu"
                    class="nav-item"
                    :class="{ active: selectedParentMenu == 'assurance' }"
                    data-item="assurance"
            >
                <a class="nav-item-hold" href="#">
                    <router-link tag="a" class to="/app/assurances/assurance-list">
                        <i class="nav-icon i-ID-Card"></i>
                        <span class="nav-text">{{ $t("Contrat") }}</span>
                    </router-link>
                </a>
                <div class="triangle"></div>
            </li>
          <li
              @mouseenter="toggleSubMenu"
              class="nav-item"
              :class="{ active: selectedParentMenu == 'accident' }"
              data-item="accident"
          >
            <a class="nav-item-hold" href="#">
              <router-link tag="a" class to="/app/accidents/accident-list">
                <i class="nav-icon i-File-Fire"></i>
                <span class="nav-text">{{ $t("Accident") }}</span>
              </router-link>
            </a>
            <div class="triangle"></div>
          </li>
            <li     v-if= "isAdmin"
                    @mouseenter="toggleSubMenu"
                    class="nav-item"
                    :class="{ active: selectedParentMenu == 'organisation' }"
                    data-item="organisation"
            >
                <a class="nav-item-hold" href="#">
                    <router-link tag="a" class to="/app/organisation/organisationList">
                        <i class="nav-icon i-Home-4"></i>
                        <span class="nav-text">{{ $t("Organisation") }}</span>
                    </router-link>
                </a>
                <div class="triangle"></div>
            </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>
      <vue-perfect-scrollbar
              :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              class="sidebar-left-secondary ps rtl-ps-none"
      >
          <div ref="sidebarChild">
              <!-- Submenu Dashboards -->
              <ul
                      class="childNav d-none"
                      data-parent="crm"
                      :class="{ 'd-block': selectedParentMenu == 'dashboards' }"
              >
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/caisse/catproduct">
                          <i class="nav-icon i-Clothing-Store"></i>
                          <span class="item-name">{{$t("Catégorie de produit")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/signUp">
                          <i class="nav-icon i-Car-Items"></i>
                          <span class="item-name">{{$t("Produit")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/forgot">
                          <i class="nav-icon i-Shop-2"></i>
                          <span class="item-name">{{$t("Client")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/forgot">
                          <i class="nav-icon i-Business-Man"></i>
                          <span class="item-name">{{$t("Contact")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/forgot">
                          <i class="nav-icon i-Cool-Guy"></i>
                          <span class="item-name">{{$t("Vendeur")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/forgot">
                          <i class="nav-icon i-Geek"></i>
                          <span class="item-name">{{$t("Caissier(ière)")}}</span>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link tag="a" class to="/app/sessions/forgot">
                          <i class="nav-icon i-Cash-register-2"></i>
                          <span class="item-name">{{$t("Caisse")}}</span>
                      </router-link>
                  </li>

              </ul>
          </div>
      </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isAdmin: false,
      userinfo:{},
      isStyle: true,
      selectedParentMenu: "",
      isMobile
    };
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
    this.isitAdmin();
    console.log('is admin ?', this.isAdmin)
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),
    isitAdmin(){
      let bool =this.userinfo.role==null? false : this.userinfo.role.find(this.findRole)
        if(bool)
            this.isAdmin = true;
    },
    findRole(role){
        return role === 'admin';
    },
    handleWindowResize() {
      //  console.log('not working is Mobile');
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;
      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>
