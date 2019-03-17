import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";
import createPersistedState from 'vuex-persistedstate'

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import { iAnnouncement } from './models/announcement.interface';
import { iService } from "@/models/service.interface";
import { iCart} from "@/models/cart.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  cart: iCart | null;
  orderNum: number | null;
  mCat: number | null;
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  cart: null,
  orderNum: null,
  mCat: null,
};

const mutations: MutationTree<iRootState> = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  login(state, payload) {
    const { token, user } = payload;
    state.userToken = token;
    state.user = user;
  },
  logout(state) {
    state.userToken = null;
    state.user = null;
  },
  getCart(state, payload) {
    const { cart } = payload;
    state.cart = cart;
  },
  removeCart(state, payload) {
    state.cart = null;
  }
};

const actions: ActionTree<iRootState, iRootState> = {
  fetchUser({ commit }, payload) {
    const { userid } = payload;
    return axios
      .get(APIConfig.buildUrl(`/users/${userid}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        commit("setUser", { user: res.data.user });
        return res.data.user;
      });
  },
  login({ commit, dispatch }, payload) {
    const { userid, token } = payload;
    dispatch("fetchUser", { userid }).then(user => {
      commit("login", { user, token });
    });
  }
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
  actions
});
